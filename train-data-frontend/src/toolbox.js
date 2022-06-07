
export function toolboxInit(isLightMode) {
    const toolboxEl = document.getElementById("toolbox");
    toolboxEl.style.backgroundColor = isLightMode ? 'white' : 'black'
    toolboxEl.style.color = isLightMode ? 'black' : 'white'
}