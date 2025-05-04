import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import {
  FilterIcon,
  ChevronDown,
  X,
  Globe,
  Languages,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const FilterSidebar = ({
  availableRegions,
  availableLanguages,
  regions,
  setRegions,
  languages,
  setLanguages,
}) => {
  const [regionOpen, setRegionOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageSearch, setLanguageSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  // Filter languages based on search
  const filteredLanguages = availableLanguages.filter((lang) =>
    lang.toLowerCase().includes(languageSearch.toLowerCase())
  );

  // Determine how many languages to display
  const displayLanguages =
    showAll || languageSearch
      ? filteredLanguages
      : filteredLanguages.slice(0, 8);

  const hasMoreLanguages =
    !showAll && !languageSearch && filteredLanguages.length > 8;

  const toggleSelection = (value, current, setter) => {
    setter(
      current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
    );
  };

  const clearAllFilters = () => {
    setRegions([]);
    setLanguages([]);
  };

  const totalSelectedFilters = regions.length + languages.length;

  // Close all sections on mobile initially
  useEffect(() => {
    if (isMobile) {
      setRegionOpen(false);
      setLanguageOpen(false);
    }
  }, [isMobile]);

  return (
    <Card className="top-4 border shadow-sm bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <FilterIcon className="w-4 h-4" />
            Filters
            {totalSelectedFilters > 0 && (
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary ml-2"
              >
                {totalSelectedFilters}
              </Badge>
            )}
          </CardTitle>
          {totalSelectedFilters > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-xs h-7 px-2 text-muted-foreground hover:text-primary"
            >
              Clear all
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-6">
        {/* Active Filters */}
        {totalSelectedFilters > 0 && (
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Active filters:</div>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Badge
                  key={`filter-${region}`}
                  variant="secondary"
                  className="bg-primary/10 group transition-all hover:bg-primary/20"
                >
                  {region}
                  <button
                    onClick={() =>
                      setRegions(regions.filter((r) => r !== region))
                    }
                    className="ml-1 group-hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {languages.map((lang) => (
                <Badge
                  key={`filter-${lang}`}
                  variant="secondary"
                  className="bg-primary/10 group transition-all hover:bg-primary/20"
                >
                  {lang}
                  <button
                    onClick={() =>
                      setLanguages(languages.filter((l) => l !== lang))
                    }
                    className="ml-1 group-hover:text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Regions */}
        <Collapsible open={regionOpen} onOpenChange={setRegionOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary/80" />
              <span>Regions</span>
              {regions.length > 0 && (
                <Badge
                  variant="outline"
                  className="ml-auto text-xs bg-primary/5 hover:bg-primary/10"
                >
                  {regions.length}
                </Badge>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                regionOpen && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 pb-3">
            <div className="grid grid-cols-1 gap-1 pl-6">
              {availableRegions.map((region) => (
                <label
                  key={region}
                  className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
                >
                  <Checkbox
                    id={`region-${region}`}
                    checked={regions.includes(region)}
                    onCheckedChange={() =>
                      toggleSelection(region, regions, setRegions)
                    }
                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  />
                  <span
                    className={cn(
                      "text-muted-foreground text-sm",
                      regions.includes(region) && "font-medium text-foreground"
                    )}
                  >
                    {region}
                  </span>
                </label>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <Separator />

        {/* Languages */}
        <Collapsible open={languageOpen} onOpenChange={setLanguageOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium">
            <div className="flex items-center gap-2">
              <Languages className="h-4 w-4 text-primary/80" />
              <span>Languages</span>
              {languages.length > 0 && (
                <Badge
                  variant="outline"
                  className="ml-auto text-xs bg-primary/5 hover:bg-primary/10"
                >
                  {languages.length}
                </Badge>
              )}
            </div>
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                languageOpen && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 pb-3">
            {/* Language Search */}
            <div className="relative mb-3 pl-6">
              <Search className="absolute left-8 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search language..."
                value={languageSearch}
                onChange={(e) => setLanguageSearch(e.target.value)}
                className="pl-8 py-1 h-8 text-sm"
              />
            </div>

            {/* Language List */}
            <ScrollArea className="h-56 pl-6">
              <div className="grid grid-cols-1 gap-1">
                {displayLanguages.map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center gap-2 text-sm py-1.5 px-2 rounded-md hover:bg-accent cursor-pointer transition-colors"
                  >
                    <Checkbox
                      id={`lang-${lang}`}
                      checked={languages.includes(lang)}
                      onCheckedChange={() =>
                        toggleSelection(lang, languages, setLanguages)
                      }
                      className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                    />
                    <span
                      className={cn(
                        "text-muted-foreground text-sm",
                        languages.includes(lang) &&
                          "font-medium text-foreground"
                      )}
                    >
                      {lang}
                    </span>
                  </label>
                ))}

                {filteredLanguages.length === 0 && (
                  <div className="text-sm text-muted-foreground px-2 py-4 text-center">
                    No languages found
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Show more/less button */}
            {hasMoreLanguages && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="text-xs mt-2 text-primary hover:text-primary hover:bg-primary/5 w-full"
              >
                {showAll
                  ? "Show fewer languages"
                  : `Show all ${filteredLanguages.length} languages`}
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>
      </CardContent>

      {totalSelectedFilters > 0 && (
        <CardFooter className="pt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full text-xs border-dashed hover:bg-destructive/5 hover:text-destructive"
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear all filters
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default FilterSidebar;
