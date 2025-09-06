import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

interface CoffeeCardProps {
  coffee: Coffee;
}

export default function CoffeeCard({ coffee }: CoffeeCardProps) {
  const formatPrice = (priceInPaise: number) => {
    return `₹${(priceInPaise / 100).toFixed(0)}`;
  };

  const getRoastVariant = (roastLevel: string) => {
    const roast = roastLevel.toLowerCase();
    if (roast.includes('light')) return 'secondary';
    if (roast.includes('medium')) return 'default';
    if (roast.includes('dark')) return 'destructive';
    return 'outline';
  };

  const getBitternessColor = (bitterness: string) => {
    const level = bitterness.toLowerCase();
    if (level.includes('low')) return 'text-green-600';
    if (level.includes('medium')) return 'text-yellow-600';
    if (level.includes('high')) return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getAcidityColor = (acidity: string) => {
    const level = acidity.toLowerCase();
    if (level.includes('low')) return 'text-green-600';
    if (level.includes('medium')) return 'text-yellow-600';
    if (level.includes('high')) return 'text-red-600';
    return 'text-muted-foreground';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Coffee Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
        <div className="text-6xl">☕</div>
      </div>

      <CardHeader className="pb-3">
        {/* Name and Roaster */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1 line-clamp-2">
            {coffee.name}
          </h3>
          <p className="text-sm text-muted-foreground">by {coffee.roaster}</p>
        </div>

        {/* Price */}
        <div>
          <span className="text-2xl font-bold text-amber-600">
            {formatPrice(coffee.price)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Roast Level */}
        {coffee.roastLevel && (
          <div className="mb-3">
            <Badge variant={getRoastVariant(coffee.roastLevel) as "default" | "secondary" | "destructive" | "outline"}>
              {coffee.roastLevel}
            </Badge>
          </div>
        )}

        {/* Origin */}
        {coffee.origin.location && (
          <div className="mb-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Origin:</span> {coffee.origin.location}
              {coffee.origin.altitude && (
                <span className="ml-1">({coffee.origin.altitude}m)</span>
              )}
            </p>
          </div>
        )}

        {/* Processing */}
        {coffee.processing && (
          <div className="mb-3">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Processing:</span> {coffee.processing}
            </p>
          </div>
        )}

        {/* Bitterness and Acidity */}
        <div className="flex gap-4 mb-4">
          {coffee.bitterness && (
            <div className="text-sm">
              <span className="font-medium text-foreground">Bitterness:</span>
              <span className={`ml-1 font-medium ${getBitternessColor(coffee.bitterness)}`}>
                {coffee.bitterness}
              </span>
            </div>
          )}
          {coffee.acidity && (
            <div className="text-sm">
              <span className="font-medium text-foreground">Acidity:</span>
              <span className={`ml-1 font-medium ${getAcidityColor(coffee.acidity)}`}>
                {coffee.acidity}
              </span>
            </div>
          )}
        </div>

        {/* Description */}
        {coffee.description && (
          <div className="mb-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {coffee.description}
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0">
        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button className="flex-1" size="sm">
            Add to Wishlist
          </Button>
          {coffee.url && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              asChild
            >
              <a
                href={coffee.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Details
              </a>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
