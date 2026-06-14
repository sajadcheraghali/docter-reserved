import React, { ReactElement , useState } from "react";
import { IranProvinces } from "@/source/mock/IranProvinces";

interface propType {
    value : string
    setValue : (value : string) => void
}

export default function SelectedCityInSearchBoxComponent({value , setValue} : propType) : ReactElement {

    const handleOnchange = (event : React.ChangeEvent<HTMLSelectElement>)=> {
        setValue(event.target.value)
    }

    return (
        <div>
            <select 
                value={value}
                onChange={handleOnchange}
                >
                    <option value="">همه ی شهر ها</option>
                    {
                        IranProvinces["استان‌های ایران"].map((province , index) => (
                    <option value={`${province.name}`} key={index}>{province.name}</option>
                        ))
                    }
            </select>
        </div>
    )
}
