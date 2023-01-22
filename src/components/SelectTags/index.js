import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Input } from "..";
import "./index.scss";
export default function SelectTags({
  dir = null,
  label = "",
  value = [],
  placeholder = null,
  items = [],
  filter = false,
  drop = "down",
  align = "right",
  setValue = () => {},
  rules = undefined,
}) {
  const [filterText, setFilterText] = useState("");
  const filterItem = () => {
    if (filter) {
      return items.filter((e) => e.name.search(filterText) !== -1);
    }
    return items;
  };
  const showValue = () => {
    const val = value.map(
      (id) => items.find((e) => e.id === id)?.name ?? " null"
    );
    return val.join(", ");
  };
  const handleSelect = (val = "") => {
    if (value.includes(val)) {
      const newValue = [...value];
      const index = newValue.findIndex((e) => e === val);
      newValue.splice(index, 1);
      return setValue(newValue);
    }
    setValue([...value, val]);
  };
  return (
    <Dropdown
      className={`Select w-100`}
      onSelect={handleSelect}
      drop={drop}
      autoClose="outside"
    >
      <Dropdown.Toggle
        as={Input}
        // className="w-100"
        dir={dir}
        label={label}
        placeholder={placeholder}
        rules={rules}
        value={showValue()}
        append={
          <button
            type="button"
            className="bi bi-x-lg text-danger input-group-text"
            onClick={() => setValue(undefined)}
          />
        }
        readOnly
      ></Dropdown.Toggle>
      <Dropdown.Menu align={align} className="w-100">
        {filter && (
          <div className="dropdown-item">
            <FormControl
              autoFocus
              value={filterText}
              onChange={({ target }) => {
                setFilterText(target.value);
              }}
            />
          </div>
        )}
        {filterItem().map((item, index) => (
          <Dropdown.Item
            as="button"
            type="button"
            key={index}
            className="text-center"
            eventKey={item.id}
          >
            {value.includes(item.id) && (
              <i className="bi bi-check-lg text-success ms-1" />
            )}
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
