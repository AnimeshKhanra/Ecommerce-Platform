'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ShoppingCart,
  Store,
  Package,
  LayoutDashboard,
  LogOut,
  CircleUserRound,
  Menu,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth.store';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { storeUser, logout } = useAuthStore();


  // useee

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    window.location.href = '/';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-primary"
        >
          ECOM
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-4 hidden items-center md:flex">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
          >
            <Store className="size-4" />
            Products
          </Link>

          <Link
            href="/orders"
            className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
          >
            <Package className="size-4" />
            Orders
          </Link>

          {storeUser?.role === 'ADMIN' && (
            <Link
              href="/admin/dashboard"
              className={cn(buttonVariants({ variant: 'ghost' }), 'gap-2')}
            >
              <LayoutDashboard className="size-4" />
              Admin Dashboard
            </Link>
          )}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-1">
          {/* Cart */}
          <Link
            href="/cart"
            aria-label="Cart"
            className={buttonVariants({ variant: 'ghost', size: 'icon' })}
          >
            <ShoppingCart className="size-5" />
          </Link>

          {/* Desktop auth */}
          {!storeUser ? (
            <div className="hidden items-center gap-2 md:flex">
              <Link
                href="/login"
                className={buttonVariants({ variant: 'ghost' })}
              >
                Login
              </Link>
              <Link href="/register" className={buttonVariants()}>
                Sign Up
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="ghost" className="hidden gap-2 px-2 md:flex">
                    <Avatar className="size-8">
                      <AvatarFallback>
                        {storeUser.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-24 truncate">{storeUser.name}</span>
                  </Button>
                }
              />

              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    <p className="truncate">{storeUser.name}</p>
                    <p className="truncate text-xs font-normal text-muted-foreground">
                      {storeUser.email}
                    </p>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    render={<Link href="/profile" />}
                    className="cursor-pointer gap-2"
                  >
                    <CircleUserRound className="size-4" />
                    Profile
                  </DropdownMenuItem>

                  {storeUser.role === 'ADMIN' && (
                    <DropdownMenuItem
                      render={<Link href="/admin/dashboard" />}
                      className="cursor-pointer gap-2"
                    >
                      <LayoutDashboard className="size-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                {/* Logout */}
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer gap-2 text-destructive"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Menu"
                >
                  <Menu className="size-5" />
                </Button>
              }
            />

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="text-xl font-bold text-primary"
                  >
                    ECOM
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-1">
                <Link
                  href="/products"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'justify-start gap-2'
                  )}
                >
                  <Store className="size-4" /> Products
                </Link>

                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'justify-start gap-2'
                  )}
                >
                  <ShoppingCart className="size-4" /> Cart
                </Link>

                <Link
                  href="/orders"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: 'ghost' }),
                    'justify-start gap-2'
                  )}
                >
                  <Package className="size-4" /> Orders
                </Link>

                {storeUser?.role === 'ADMIN' && (
                  <Link
                    href="/admin/dashboard"
                    onClick={() => setOpen(false)}
                    className={cn(
                      buttonVariants({ variant: 'ghost' }),
                      'justify-start gap-2'
                    )}
                  >
                    <LayoutDashboard className="size-4" /> Admin Dashboard
                  </Link>
                )}

                <div className="my-3 border-t" />

                {!storeUser ? (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: 'outline' }),
                        'w-full'
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setOpen(false)}
                      className={cn(buttonVariants(), 'w-full')}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className={cn(
                        buttonVariants({ variant: 'ghost' }),
                        'justify-start gap-2'
                      )}
                    >
                      <CircleUserRound className="size-4" /> {storeUser.name}
                    </Link>
                    <Button
                      variant="ghost"
                      className="justify-start gap-2 text-destructive hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" /> Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
