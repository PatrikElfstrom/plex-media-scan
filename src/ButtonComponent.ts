export function ButtonComponent(label: string) {
  const button = document.createElement("button");
  button.setAttribute("id", "pms-refresh-button");
  button.setAttribute("style", "padding: 0 15px; font-size: 13px;");
  button.textContent = label;

  return button;
}
