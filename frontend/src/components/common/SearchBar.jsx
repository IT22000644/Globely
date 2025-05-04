import { Search } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { Button } from "../ui/button";

const SearchBar = ({
  setSearchTerm,
  setSearchType,
  searchTerm,
  searchType,
  handleSearch,
}) => {
  return (
    <div className="top-16 z-10 pt-4 pb-2 mb-6 bg-background/30 backdrop-blur-md">
      <div className="rounded-xl bg-background/70 backdrop-blur-lg shadow-lg border border-border/60 p-3 sm:p-4">
        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-border/60 transition-all focus-visible:border-primary focus-visible:ring-primary/40 w-full"
            />
          </div>
          <div className="flex gap-2 sm:flex-shrink-0">
            <Select
              value={searchType}
              onValueChange={(value) => setSearchType(value)}
              className="flex-1 sm:flex-none sm:w-40"
            >
              <SelectTrigger className="border-border/60 w-full">
                <SelectValue placeholder="Search by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="capital">Capital</SelectItem>
                <SelectItem value="region">Region</SelectItem>
                <SelectItem value="language">Language</SelectItem>
              </SelectContent>
            </Select>
            <Button
              type="submit"
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-primary-foreground flex-shrink-0 px-6"
            >
              Search
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
