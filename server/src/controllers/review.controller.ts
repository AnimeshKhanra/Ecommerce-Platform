import { Request, Response } from 'express';
import { getCache, setCache, delCache } from '../utils/redisUtils';

import { ApiError } from '../utils/ApiError';
import { ApiResponse } from '../utils/ApiResponse';
import { asyncHandler } from '../utils/asyncHandler';

import prisma from '../config/prisma';




const createReview = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    throw new ApiError(401, 'You are not Authorized');
  }

  const { productId, rating, comment } = req.body;

  const purchased = await prisma.orderItem.findFirst({
    where: {
      productId,
      order: {
        userId,
        paymentStatus: 'PAID',
      },
    },
  });

  if (!purchased) {
    throw new ApiError(403, 'Only verified buyers can review');
  }

  const existing = await prisma.review.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existing) {
    throw new ApiError(400, 'Already reviewed');
  }

  const review = await prisma.review.create({
    data: {
      userId,
      productId,
      rating,
      comment,
    },
  });

  await delCache(`reviews:${productId}`);

  return res.status(201).json(new ApiResponse(201, review, 'Review created'));
});

const getReviews = asyncHandler(async (req: Request, res: Response) => { 
  const { productId } = req.params;
  if(!productId || Array.isArray(productId)){
    throw new ApiError(400, "ProductID is missing");
  }

  const cacheKey = `reviews:${productId}`;

  const cached = await getCache(cacheKey);

  if(cached){
    return res
          .status(200)
          .json(new ApiResponse(200, cached, "Reviews cache"))
  }

  const reviews = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      user: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const avgRating = 
    reviews.length 
    ?  
    reviews.reduce(
      (sum, r) => sum + r.rating, 0
    )/reviews.length
    : 0;

  const data = {
    reviews,
    avgRating,
    totalReviews: reviews.length,
  }

  await setCache(cacheKey, data, 3600)

  return res.status(200).json(new ApiResponse(200, data, "Reviews fetched"));
});

const updateReview = asyncHandler(async(req: Request, res: Response) => {
  const userId = req.user?.id;
  if(!userId){
    throw new ApiError(401, "You are not Authorized");
  }

  const reviewId = req.params.id;
  if(!reviewId || Array.isArray(reviewId)){
    throw new ApiError(400, "ReviewID is missing");
  }

  const { rating, comment } = req.body;

  const existingReview = await prisma.review.findUnique({
    where: {
      id: reviewId,
    }
  })

  if(!existingReview){
    throw new ApiError(404, "Review not found");
  }

  if(existingReview.userId !== userId){
    throw new ApiError(403, "You can only update your own reviews");
  }

  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data: {
      rating,
      comment,
    }
  })

  await delCache(`reviews:${existingReview.productId}`);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedReview, "Review updated successfully"));
})

const deleteReview = asyncHandler(async(req: Request, res: Response) => {
  const userId = req.user?.id;
  if(!userId){
    throw new ApiError(401, "You are not Authorized");
  }

  const reviewId = req.params.id;
  if(!reviewId || Array.isArray(reviewId)){
    throw new ApiError(400, "ReviewID is missing");
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      id: reviewId,
    }
  })

  if(!existingReview){
    throw new ApiError(404, "Review not found");
  }

  if(existingReview.userId !== userId){
    throw new ApiError(403, "You can only delete your own reviews");
  }

  await prisma.review.delete({
    where: {
      id: reviewId,
    }
  })

  await delCache(`reviews:${existingReview.productId}`);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Review deleted successfully"))

})


export { createReview, getReviews, updateReview, deleteReview };
