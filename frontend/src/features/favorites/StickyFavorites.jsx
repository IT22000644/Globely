import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StickyFavorites({ openFavorites, setOpenFavorites }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 block">
      <Button
        onClick={() => setOpenFavorites(!openFavorites)}
        variant="outline"
        size="icon"
        className="rounded-full shadow-md bg-background/90 backdrop-blur transition-all border border-foreground/20 hover:border-foreground/50"
      >
        <Heart
          data-testid="heart-icon"
          className={openFavorites ? "fill-red-500 text-red-500" : ""}
        />
      </Button>
    </div>
  );
}
