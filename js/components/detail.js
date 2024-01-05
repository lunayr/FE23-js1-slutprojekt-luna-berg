export function detail(key, value) {
  let keyContainer = $(`<span>${key}</span>`);
  let valueContainer;
  if (Array.isArray(value)) {
    valueContainer = $("<ul></ul>");
    if (value.length < 1) {
      valueContainer.append("-");
    }
    value.forEach((val) => {
      let listItem = $("<li></li>");
      valueContainer.append(listItem);
      listItem.append(val);
    });
  } else {
    valueContainer = $("<span></span>");
    valueContainer.append(value || "-");
  }

  let detail = $(`<div class='detail'></div>`);
  detail.append(keyContainer, valueContainer);

  return detail;
}
