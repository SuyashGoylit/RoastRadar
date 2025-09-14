import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWishlistContext } from "@/contexts/WishlistContext";
import { Heart } from "lucide-react";
import { useState } from "react";

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
  const { toggleWishlist, isInWishlist, loading } = useWishlistContext();
  const [isToggling, setIsToggling] = useState(false);

  const formatPrice = (priceInPaise: number) => {
    return `₹${(priceInPaise / 100).toFixed(0)}`;
  };

  const handleWishlistToggle = async () => {
    setIsToggling(true);
    try {
      await toggleWishlist(coffee.id);
    } finally {
      setIsToggling(false);
    }
  };

  const getRoastVariant = (roastLevel: string) => {
    const roast = roastLevel.toLowerCase();
    if (roast.includes('light')) return 'secondary';
    if (roast.includes('medium')) return 'default';
    if (roast.includes('dark')) return 'destructive';
    return 'outline';
  };


  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Coffee Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
        <div className="text-6xl">☕</div>
      </div>

      <CardHeader className="pb-3">
        {/* Title - Coffee Name */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-foreground line-clamp-2">
            {coffee.name || "Unknown Coffee"}
          </h3>
        </div>

        {/* Roaster */}
        <div className="mb-3">
          <p className="text-sm text-muted-foreground">
            by {coffee.roaster || "Unknown Roaster"}
          </p>
        </div>

        {/* Roast Level */}
        <div className="mb-3">
          <Badge variant={getRoastVariant(coffee.roastLevel || "Unknown") as "default" | "secondary" | "destructive" | "outline"}>
            {coffee.roastLevel || "Unknown Roast"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0 flex-1">
        {/* Description */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground line-clamp-4">
            {coffee.description || "No description available for this coffee."}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        {/* Action Buttons */}
        <div className="flex gap-2 w-full">
          <Button 
            className="flex-1 cursor-pointer hover:scale-105 transition-transform" 
            size="sm"
            variant={isInWishlist(coffee.id) ? "default" : "outline"}
            onClick={handleWishlistToggle}
            disabled={loading || isToggling}
          >
            <Heart 
              className={`w-4 h-4 mr-2 ${
                isInWishlist(coffee.id) 
                  ? "fill-red-500 text-red-500" 
                  : "text-muted-foreground"
              }`} 
            />
            {isInWishlist(coffee.id) ? "In Wishlist" : "Add to Wishlist"}
          </Button>
          
          {/* Price Button */}
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 cursor-default"
            disabled
          >
            <span className="text-amber-600 font-bold">
              {formatPrice(coffee.price || 0)}
            </span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
