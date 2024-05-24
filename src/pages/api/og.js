import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";


export const config = {
    runtime: "experimental-edge",
};

// const font1 = fetch(new URL('../../assets/fonts/NunitoSans-Regular.ttf', import.meta.url)).then(
//     (res) => res.arrayBuffer(),
// );

// const font2 = fetch(new URL('../../assets/fonts/NunitoSans-Bold.ttf', import.meta.url)).then(
//     (res) => res.arrayBuffer(),
// );

// const font3 = fetch(new URL('../../assets/fonts/NunitoSans-SemiBold.ttf', import.meta.url)).then(
//     (res) => res.arrayBuffer(),
// );



// const font4 = fetch(new URL('../../assets/fonts/NunitoSans-Black.ttf', import.meta.url)).then(
//     (res) => res.arrayBuffer(),
// );
// const font5 = fetch(new URL('../../assets/fonts/NunitoSans-ExtraBold.ttf', import.meta.url)).then(
//     (res) => res.arrayBuffer(),
// );
// const font6 = fetch(new URL('../../assets/fonts/NunitoSans-ExtraLight.ttf', import.meta.url)).then(
//     (res) => res.arrayBuffer(),
// );
// const font7 = fetch(new URL('../../assets/fonts/NunitoSans-Light.ttf', import.meta.url)).then(
//     (res) => res.arrayBuffer(),
// );



export default async function handler(req = NextRequest) {

    // const nunitoRegular = await font1;
    // const nunitoBold = await font2;
    // const nunitoSemiBold = await font3;

    // const nunitoBlack = await font4;
    // const nunitoExtraBold = await font5;
    // const nunitoExtraLight = await font6;
    // const nunitoLight = await font7;


    try {
        const { searchParams } = new URL(req.url);
        const imgUrl = searchParams?.get("imgUrl");
        const services = searchParams?.get("services");
        const pageUrl = searchParams?.get("pageUrl");

        let expertise = services?.replace(/_/g, " ");

        expertise = expertise?.split("-");

        return new ImageResponse(
            (
                <>
                    <div
                        style={{
                            display: "flex",
                            fontSize: 60,
                            color: "black",
                            background: "white",
                            width: "100%",
                            height: "248px",
                            padding: "18px 22px 22px 22px",
                            flexDirection: "column",
                            objectFit: "contain",
                            // justifyContent: "center",
                            alignItems: "flex-start",
                            position: "relative",
                        }}
                    >
                        <div style={{ flexDirection: "row", display: "flex", gap: "15px" }}>
                            <div style={{ width: "34%", display: "flex", objectFit: "cover" }}>
                                <img
                                    src={imgUrl}
                                    style={{
                                        borderRadius: 12,
                                        // height: "inherit",
                                        maxHeight: "180px",
                                        objectFit: "cover",

                                        position: "relative",
                                        zIndex: "999",
                                        width: "99%",
                                    }}
                                />
                            </div>

                            <div
                                style={{
                                    width: "59%",
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: "10px",
                                    fontFamily: "Nunito Sans",
                                    fontStyle: "normal",
                                }}
                            >
                                {/* <div
                                    style={{
                                        fontweight: "700",
                                        fontSize: "12px",
                                        // lineHeight: '150%',
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#0A1629",
                                    }}
                                >
                                    Hi There!
                                </div> */}
                                <div
                                    style={{
                                        fontFamily: "Nunito Sans",
                                        fontStyle: "normal",
                                        fontweight: "800",
                                        fontSize: "19px",
                                        // lineHeight: '150%',
                                        display: "flex",
                                        alignItems: "center",
                                        color: "#0A1629",
                                    }}
                                >
                                    Connect with me on a 1:1 call for
                                </div>

                                {expertise?.slice(0, 3)?.map((exp, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: "flex",

                                            alignItems: "center",
                                            gap: "10px",
                                            justifyContent: "center"
                                            // maxHeight: "25px",
                                            // overflowY: "hidden"

                                        }}
                                    >
                                        <img
                                            style={{ width: "12px", height: "12px" }}
                                            src={
                                                "https://storage.googleapis.com/cp-assets-public-staging/tick-circle.png"
                                            }
                                            width="12"
                                            height="12"
                                        />

                                        <div
                                            style={{
                                                fontWeight: "700",
                                                fontSize: "12px",
                                                width: "100%",
                                                display: "flex",
                                                // alignItems: "center",
                                                color: "#0A1629",
                                                fontFamily: 'Nunito Sans',
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap"
                                            }}
                                        >
                                            {exp}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <img
                                src="https://storage.googleapis.com/cp-assets-public-staging/subtract-1.png"
                                style={{
                                    position: "absolute",
                                    top: "-80%",
                                    right: "-35%",
                                    width: "513px",
                                    height: "513px",
                                }}
                            />
                        </div>
                        <div
                            style={{

                                height: "20px",
                                width: "100%",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                // marginTop: '2%',
                                position: "absolute",
                                bottom: "15px",
                                left: "22px",
                                gap: "5px",

                            }}
                        >
                            <img
                                src="https://storage.googleapis.com/cp-assets-public-staging/Group%2048096209.png"
                                style={{
                                    width: "22px",
                                    height: "22px",
                                }}
                            />
                            <div style={{
                                fontFamily: "Nunito Sans",
                                fontStyle: "normal",
                                fontWeight: "700",
                                fontSize: "14px",
                                width: "100%",

                                // whiteSpace: "nowrap",
                                // textOverflow: "ellipsis"
                            }} >
                                {pageUrl}
                            </div>
                        </div>
                    </div>
                </>
            ),
            {
                width: 500,
                height: 248,
                // fonts: [
                // {
                //     name: 'NunitoRegular',
                //     data: nunitoRegular,

                // },
                // {
                //     name: 'NunitoBold',
                //     data: nunitoBold,

                // },
                // {
                //     name: 'NunitoSemiBold',
                //     data: nunitoSemiBold
                // },
                // {
                //     name: 'NunitoExtraBold',
                //     data: nunitoExtraBold
                // },
                // {
                //     name: 'NunitoBlack',
                //     data: nunitoBlack
                // },
                // {
                //     name: 'NunitoExtraLight',
                //     data: nunitoExtraLight
                // },
                // {
                //     name: 'NunitoLight',
                //     data: nunitoLight
                // }
                // ],
            }
        );
    } catch (e) {
        console.log(`${e.message}`);
        return new Response(`Failed to generate the image`, {
            status: 500,
        });
    }
}
