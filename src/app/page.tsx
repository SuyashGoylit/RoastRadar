'use client';

import { useEffect, useState } from 'react';
import CoffeeCard from '@/components/CoffeeCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface Coffee {
  id: string;
  name: string;
  roaster: string;
  type: string;
  roastLevel: string;
  bitterness: string;
  acidity: string;
  origin: {
    location?: string;
    altitude?: number;
  };
  processing: string;
  description: string;
  price: number;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function Home() {
  const [coffees, setCoffees] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const response = await fetch('/api/coffees');
        if (!response.ok) {
          throw new Error('Failed to fetch coffees');
        }
        const data = await response.json();
        setCoffees(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffees();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading coffee collection...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <Card className="p-8">
          <CardContent className="text-center">
            <div className="text-red-500 text-6xl mb-4">☕</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Oops!</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button 
              onClick={() => window.location.reload()}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
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
              <Button className="bg-amber-600 hover:bg-amber-700">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="mb-8">
          <Card className="border-amber-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Bean Bank</h2>
                  <p className="text-muted-foreground mt-1">
                    {coffees.length} {coffees.length === 1 ? 'coffee' : 'coffees'} from {new Set(coffees.map(c => c.roaster)).size} roasters
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600">
                    {coffees.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Coffees</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coffee Grid */}
        {coffees.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {coffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <div className="text-6xl mb-4">☕</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No coffees found</h3>
              <p className="text-muted-foreground">Check back later for new additions to our collection.</p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-amber-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground">
            <p>Made with ☕ by <a href="https://github.com/SuyashGoylit" className="text-primary underline">Suyash Goylit</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}