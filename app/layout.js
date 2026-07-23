import "./globals.css";

export const metadata = {
    title: "Codding Adda",
    description: "Online Code Editor",
};

export default function RootLayout({children}){
    return(
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}