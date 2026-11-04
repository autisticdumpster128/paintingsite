import { type PageKey } from "../data/pages"

function Footer(props: { onOpen: (page: PageKey ) => void }) {

    return(
        <footer className="footer">
            <button onClick={() => props.onOpen("about")}>ABOUT ME</button>
            <button onClick={() => props.onOpen("info")}>INFO</button>
            <button onClick={() => props.onOpen("contact")}>CONTACT</button>
            <button onClick={() => props.onOpen("cookies")}>COOKIES</button>
        </footer>
    )
}
export default Footer