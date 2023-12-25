import { VideoData } from "@/data/VideoData";
import { useState } from "react";
import SearchInput from "react-search-input";

export default function Data () {
    const [searchTerm, setSearchTerm] = useState("");

    function handleChange(term) {
        setSearchTerm(term);
    }

    const filteredData = VideoData.filter((item) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <SearchInput className="search-input" onChange={handleChange}/>
            <ul>
                {filteredData.map((item, index) => (
                <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    )
}