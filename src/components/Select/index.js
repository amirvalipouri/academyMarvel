import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import { Input } from "..";
import "./index.scss";
export default function Select({
  dir = null,
  label = "",
  value = "",
  placeholder = null,
  items = [],
  filter = false,
  drop = "down",
  align = "right",
  setValue = () => {},
  rules = undefined,
  cancelBtn = false,
}) {
  const [filterText, setFilterText] = useState("");
  const filterItem = () => {
    if (filter) {
      return items.filter((e) => e.name.search(filterText) !== -1);
    }
    return items;
  };
  const showValue = () => {
    return items.find((e) => `${e.id}` === `${value}`)?.name;
  };
  const showCancelBtn = cancelBtn && !!showValue();
  return (
    <Dropdown className={`Select w-100`} onSelect={setValue} drop={drop}>
      <Dropdown.Toggle
        as={Input}
        className="w-100"
        dir={dir}
        label={label}
        placeholder={placeholder}
        rules={rules}
        value={showValue()}
        readOnly
        append={
          showCancelBtn && (
            <button
              type="button"
              onClick={() => setValue(undefined)}
              className="bi bi-x-lg text-danger input-group-text"
            />
          )
        }
      >
        {/* <Input
          dir={dir}
          label={label}
          placeholder={placeholder}
          rules={rules}
          value={showValue()}
          append={
            cancelBtn && (
              <button
                type="button"
                onClick={() => setValue(undefined)}
                className="bi bi-x-lg text-danger input-group-text"
              />
            )
          }
          readOnly
        /> */}
      </Dropdown.Toggle>
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
          <Dropdown.Item key={index} className="text-center" eventKey={item.id}>
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
