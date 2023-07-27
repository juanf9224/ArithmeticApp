import { Search } from "@mui/icons-material";
import { Paper, InputBase, Divider, Button } from "@mui/material";
import { FunctionComponent, useState, memo, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { debounce } from "utils/search.utils";

export type SearchInputProp = {
    onSearchChange: (term: string) => void;
    placeholder?: string;
}

export const SearchInput: FunctionComponent<SearchInputProp> = ({ onSearchChange, placeholder = 'Search' }: SearchInputProp) => {
    const [searchTerm, setSearchTerm] = useState<string>('');    

    const onInputChange = (value: string) => {
        setSearchTerm(value);        
        debounce(() => {         
            onSearchChange(value);
        }, 500);
    }

    const preventEnterKeyRefresh = (ev: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (ev.key === 'Enter') ev.preventDefault();
    };
    return (
        <Paper component="form" style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'white',
            width: '100%',
            height: 'min(5vh, 100px)',
        }}>
            <InputBase
                style={{
                    flex: 1,
                    paddingLeft: 15
                }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search customer' }}
                value={searchTerm}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyDown={preventEnterKeyRefresh}
            />
            <Divider
                style={{
                    height: 28,
                    margin: 4,
                }}
                orientation="vertical"
            />
            <Button
                type="button"
                style={{ padding: 10 }}
                aria-label="search"
                onClick={() => onSearchChange(searchTerm)}
            >
                <Search />  
            </Button>
        </Paper>
    );
};

export const MemoizedSearchInput = memo(SearchInput);
