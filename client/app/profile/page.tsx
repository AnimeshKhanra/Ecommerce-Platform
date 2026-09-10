"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  CircleUserRound,
  LogOut,
  KeyRound,
} from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";

export default function ProfilePage() {
  const { storeUser, logout } = useAuthStore();

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Prefill form once the user is available
  useEffect(() => {
    if (storeUser) {
      setName(storeUser.name);
    }
  }, [storeUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      // Wire your API here, e.g.:
      // await api.patch("/users/me", { name });
      //
      // Then update the store so the navbar reflects the new name:
      // useAuthStore.setState({ storeUser: { ...storeUser, name } });

      setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  // Not signed in
  if (!storeUser) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <Card className="w-full max-w-sm text-center">
          <CardHeader>
            <CardTitle>You are not signed in</CardTitle>
            <CardDescription>
              Please log in to view your profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/login" className={buttonVariants()}>
              Go to Login
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-6 gap-2 pl-0 text-muted-foreground hover:text-foreground"
        )}
      >
        <ArrowLeft className="size-4" />
        Back to Home
      </Link>

      {/* Profile header */}
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar className="size-20">
            <AvatarFallback className="text-3xl">
              {storeUser.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center gap-2 sm:justify-start">
              <CardTitle className="text-2xl">{storeUser.name}</CardTitle>
              <Badge variant={storeUser.role === "ADMIN" ? "default" : "secondary"}>
                {storeUser.role}
              </Badge>
            </div>
            <CardDescription className="mt-1">
              {storeUser.email}
            </CardDescription>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <dl className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <CircleUserRound className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">Full name</dt>
              <dd className="font-medium">{storeUser.name}</dd>
            </div>

            <div className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">Email</dt>
              <dd className="font-medium">{storeUser.email}</dd>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">Account type</dt>
              <dd className="font-medium">{storeUser.role}</dd>
            </div>

            {/* <div className="flex items-center gap-3">
              <KeyRound className="size-4 shrink-0 text-muted-foreground" />
              <dt className="w-28 shrink-0 text-muted-foreground">User ID</dt>
              <dd className="truncate font-mono text-xs">{storeUser.id}</dd>
            </div> */}
          </dl>
        </CardContent>
      </Card>

      {/* Edit profile */}
      {/* <Card className="mt-6">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>
            Update your display name. Email cannot be changed.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" value={storeUser.email} disabled />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving || name === storeUser.name}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
              {saved && (
                <p className="text-sm text-green-600">Profile updated.</p>
              )}
            </div>
          </form>
        </CardContent>
      </Card> */}

      {/* Sign out */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sign Out</CardTitle>
          <CardDescription>
            You will be logged out of your account on this device.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            variant="outline"
            className="gap-2 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}