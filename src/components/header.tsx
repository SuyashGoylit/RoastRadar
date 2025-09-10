import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <ClerkProvider>
        <header className="bg-white shadow-sm border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
            <div>
                <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
                <span className="text-4xl">☕</span>
                Roast Radar
                </h1>
                <p className="text-muted-foreground mt-1">Discover exceptional specialty coffee</p>
            </div>
            <div className="flex items-center gap-4">
                <SignedOut>
                <SignInButton>
                    <Button className="bg-amber-500 hover:bg-amber-600 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign In
                    </Button>
                </SignInButton>
                </SignedOut>
                <SignedIn>
                <UserButton afterSignOutUrl="/" />
                </SignedIn>
            </div>
            </div>
        </div>
        </header>
    </ClerkProvider>
  );
}
