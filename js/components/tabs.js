export function tabs(content) {
  let tabs = $("<sl-tab-group></sl-tab-group>");
  content.forEach((tab) => {
    tabs.append(`<sl-tab slot="nav" panel="${tab.id}">${tab.title}</sl-tab>`);
  });
  content.forEach((tab) => {
    let content = $(`<sl-tab-panel name="${tab.id}"></sl-tab-panel>`);
    content.append(tab.content);
    tabs.append(content);
  });
  return tabs;
}


// Source from shoelace being used to create tabs().
/* <sl-tab-group>
    <sl-tab slot="nav" panel="general">General</sl-tab>
    <sl-tab slot="nav" panel="custom">Custom</sl-tab>
    <sl-tab slot="nav" panel="advanced">Advanced</sl-tab>
    <sl-tab slot="nav" panel="disabled" disabled>Disabled</sl-tab>

    <sl-tab-panel name="general">This is the general tab panel.</sl-tab-panel>
    <sl-tab-panel name="custom">This is the custom tab panel.</sl-tab-panel>
    <sl-tab-panel name="advanced">This is the advanced tab panel.</sl-tab-panel>
    <sl-tab-panel name="disabled">This is a disabled tab panel.</sl-tab-panel>
</sl-tab-group> */

