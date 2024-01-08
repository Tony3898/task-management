import MiniDrawer from "../components/misc/appDrawer.tsx";
import {AppLayoutProps} from "../interfaces/AppLayout.ts";

export default function AppLayout({children}: AppLayoutProps): JSX.Element {
    return <MiniDrawer children={children}/>
}
