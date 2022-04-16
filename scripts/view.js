export const StartMenu = (props) => {
    const {} = props;
    renderDOM(
    `${HUD(timer,score)}
    <hr>
    <button onclick='start()'>show schedule</button>`
    )
}