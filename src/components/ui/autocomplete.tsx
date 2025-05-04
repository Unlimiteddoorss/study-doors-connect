
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AutocompleteOption {
  value: string;
  label: string;
  description?: string; // Optional description for each option
  group?: string; // Optional group for categorized options
}

interface AutocompleteProps {
  options: AutocompleteOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  emptyMessage?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  showDescription?: boolean; // Whether to display descriptions
  groupByCategory?: boolean; // Whether to group options by category
  clearable?: boolean; // Whether to allow clearing the selection
  allowFiltering?: boolean; // Whether to allow filtering options
}

export function Autocomplete({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  emptyMessage = "No results found",
  searchPlaceholder = "Search...",
  className,
  disabled = false,
  readOnly = false,
  showDescription = false,
  groupByCategory = false,
  clearable = false,
  allowFiltering = true,
}: AutocompleteProps) {
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const selectedOption = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  // Group options by category if needed
  const groupedOptions = React.useMemo(() => {
    if (!groupByCategory) {
      return { undefined: options };
    }

    return options.reduce<Record<string, AutocompleteOption[]>>((groups, option) => {
      const group = option.group || "Other";
      if (!groups[group]) {
        groups[group] = [];
      }
      groups[group].push(option);
      return groups;
    }, {});
  }, [options, groupByCategory]);

  // Filter options based on search query
  const filteredOptions = React.useMemo(() => {
    if (!searchQuery || !allowFiltering) {
      return groupByCategory ? groupedOptions : { undefined: options };
    }

    const query = searchQuery.toLowerCase();
    
    if (groupByCategory) {
      return Object.entries(groupedOptions).reduce<Record<string, AutocompleteOption[]>>(
        (filtered, [group, groupOptions]) => {
          const filteredGroupOptions = groupOptions.filter(
            (option) => 
              option.label.toLowerCase().includes(query) || 
              option.description?.toLowerCase().includes(query)
          );
          
          if (filteredGroupOptions.length > 0) {
            filtered[group] = filteredGroupOptions;
          }
          
          return filtered;
        }, 
        {}
      );
    }
    
    const filtered = options.filter(
      (option) => 
        option.label.toLowerCase().includes(query) || 
        option.description?.toLowerCase().includes(query)
    );
    
    return { undefined: filtered };
  }, [options, searchQuery, allowFiltering, groupByCategory, groupedOptions]);

  const handleSelect = React.useCallback((selectedValue: string) => {
    onChange(selectedValue === value && clearable ? "" : selectedValue);
    setOpen(false);
    setSearchQuery("");
  }, [value, onChange, clearable]);

  const handleClear = React.useCallback(() => {
    onChange("");
    setSearchQuery("");
  }, [onChange]);

  return (
    <Popover open={open && !disabled && !readOnly} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-start font-normal",
            !selectedOption && "text-muted-foreground",
            className
          )}
          disabled={disabled || readOnly}
        >
          {selectedOption ? selectedOption.label : placeholder}
          {!readOnly && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput 
              placeholder={searchPlaceholder} 
              value={searchQuery}
              onValueChange={allowFiltering ? setSearchQuery : undefined}
            />
          </div>
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            {Object.entries(filteredOptions).map(([group, groupOptions]) => (
              <React.Fragment key={group}>
                {groupByCategory && group !== "undefined" && (
                  <CommandGroup heading={group}>
                    {groupOptions.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                      >
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === option.value ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <span>{option.label}</span>
                          </div>
                          {showDescription && option.description && (
                            <span className="ml-6 text-xs text-muted-foreground">
                              {option.description}
                            </span>
                          )}
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                {(!groupByCategory || group === "undefined") &&
                  groupOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={() => handleSelect(option.value)}
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === option.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <span>{option.label}</span>
                        </div>
                        {showDescription && option.description && (
                          <span className="ml-6 text-xs text-muted-foreground">
                            {option.description}
                          </span>
                        )}
                      </div>
                    </CommandItem>
                  ))}
              </React.Fragment>
            ))}
            {clearable && value && (
              <div className="px-2 py-1.5 border-t">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive"
                  onClick={handleClear}
                >
                  Clear selection
                </Button>
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
