'use server';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default async function SignUpPage() {
  return <RightCard />;
}

function RightCard() {
  return (
    <Card className="shadow-xs w-120 py-6">
      <CardHeader className="flex flex-col items-center">
        <Image
          src="/kardio-lockup.png"
          alt="Logo"
          width={150}
          height={48}
          className="pb-1"
        />
        <CardTitle className="text-2xl font-heading font-semibold text-foreground">
          Create your workspace
        </CardTitle>
        <CardDescription className="">
          Join thousands of teams using Kardio.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6 px-8">
          <div className="flex flex-col gap-2">
            <Label className="">Full name</Label>
            <Input
              type="text"
              placeholder="Charan"
              className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 h-10 rounded-md px-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="">Email</Label>
            <Input
              type="email"
              placeholder="charan@gmail.com"
              className="h-10 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 px-4"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="">Password</Label>
            <Input
              type="password"
              placeholder="At least 8 characters"
              minLength={8}
              className="h-10 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 px-4"
            />
          </div>
          <Button className="w-full py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 rounded-md hover:cursor-pointer">
            Create account
          </Button>
          <p className="text-muted-foreground text-sm text-center">
            Already have an account?{' '}
            <a
              href="/signin"
              className="text-primary font-medium hover:underline"
            >
              Log in
            </a>
          </p>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col justify-center pt-4">
        <div className="flex flex-col gap-2 w-full px-8">
          <p className="text-muted-foreground text-sm text-center">
            By creating an account, you agree to our <br />
            <span className="text-primary hover:underline font-medium">
              Terms of Service
            </span>{' '}
            and{' '}
            <span className="text-primary hover:underline font-medium">
              Privacy Policy
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
