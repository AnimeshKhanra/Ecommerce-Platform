// import Link from "next/link";

// interface Props {
//   title: string;
//   description: string;
//   buttonText?: string;
//   buttonLink?: string;
// }

// export default function EmptyState({
//   title,
//   description,
//   buttonText,
//   buttonLink,
// }: Props) {
//   return (
//     <div className="bg-white rounded-2xl border p-10 text-center">
//       <h2 className="text-2xl font-bold">
//         {title}
//       </h2>

//       <p className="text-slate-500 mt-3">
//         {description}
//       </p>

//       {buttonText && buttonLink && (
//         <Link
//           href={buttonLink}
//           className="inline-block mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
//         >
//           {buttonText}
//         </Link>
//       )}
//     </div>
//   );
// }


import Link from "next/link";
import { Inbox, ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
  icon,
}: Props) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4 py-16">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="items-center space-y-4">
          <div className="flex size-14 items-center justify-center rounded-full bg-muted">
            {icon ?? <Inbox className="size-7 text-muted-foreground" />}
          </div>

          <div className="space-y-1.5">
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>

        {buttonText && buttonLink && (
          <CardContent>
            <Link
              href={buttonLink}
              className={cn(buttonVariants(), "gap-2")}
            >
              {buttonText}
              <ArrowRight className="size-4" />
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
}