import React, { useEffect, useState } from "react";
import "../style/About.sass";

export const About = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    const data = [
        {
            name: "Javi",
            role: "Lead Dev",
            description:
                " Working on Dev of the full game doing all kinds of coding. Generally working on every part of AW.",
            picture: "../images/about/Javi-pfp.png",
            discord: "../images/about/discord.png",
            discordNum: "#6116",
            github: "../images/about/github.png",
            githubLink: "https://github.com/JaviTrek",
            resume: "../images/about/cv.png",
        },
        {
            name: "Rey",
            role: "Full Stack Dev",
            description:
                " Working on Dev of the full game doing all kinds of coding. Generally working on every part of AW.",
            picture: "../images/about/Rey-pfp.png",
            discord: "../images/about/discord.png",
            discordNum: "#7444",
            github: "../images/about/github.png",
            githubLink: "https://github.com/rjam13",
            resume: "../images/about/cv.png",
        },
        {
            name: "Stepan",
            role: "Back-end Dev",
            description:
                " Working on Dev of the full game doing all kinds of coding. Generally working on every part of AW.",
            picture: "../images/about/Steven-pfp.png",
            discord: "../images/about/discord.png",
            discordNum: "#1791",
            github: "../images/about/github.png",
            githubLink: "https://github.com/spopo003",
            resume: "../images/about/cv.png",
        },
        {
            name: "Victor",
            role: "Front-end Dev",
            description:
                " Working on Dev of the full game doing all kinds of coding. Generally working on every part of AW.",
            picture: "../images/about/Victor-pfp.png",
            discord: "../images/about/discord.png",
            discordNum: "#7211",
            github: "../images/about/github.png",
            githubLink: "https://github.com/VAlva8",
            resume: "../images/about/cv.png",
        },
        {
            name: "Zach",
            role: "Front-end Dev",
            description:
                " Working on Dev of the full game doing all kinds of coding. Generally working on every part of AW.",
            picture: "../images/about/Zach-pfp.png",
            discord: "../images/about/discord.png",
            discordNum: "#4541",
            github: "../images/about/github.png",
            githubLink: "https://github.com/Zack-29",
            resume: "../images/about/cv.png",
        },
        {
            name: "Miguel",
            role: "Front-end Dev",
            description:
                " Working on Dev of the full game doing all kinds of coding. Generally working on every part of AW.",
            picture: "../images/about/Miguel-pfp.png",
            discord: "../images/about/discord.png",
            discordNum: "#1054",
            github: "../images/about/github.png",
            githubLink: "https://github.com/MiguelGarcia2002",
            resume: "../images/about/cv.png",
        },
        {
            name: "Emanuel",
            role: "Front-end Dev",
            description:
                " Working on Dev of the full game doing all kinds of coding. Generally working on every part of AW.",
            picture: "../images/about/Emiliano-pfp.png",
            discord: "../images/about/discord.png",
            discordNum: "#5569",
            github: "../images/about/github.png",
            githubLink: "https://github.com/ERivas-786",
            resume: "../images/about/cv.png",
        },
    ];

    let htmlArray = [];

    for (let i = 0; i < data.length; i++) {
        let memberHTML = (
            <div className="grid">
                <div className="outside-profile">
                    <div className="social-content">
                        <div className="pfp">
                            <img src={data[i].picture} height={75} width="75"></img>
                        </div>

                        <div className="socials-box">
                            <img
                                className="social-images"
                                src={data[i].discord}
                                height={35}
                                width="35"
                            ></img>
                            <p className="discord-num">{data[i].discordNum}</p>
                        </div>

                        <div className="socials-box">
                            <img
                                className="social-images"
                                src={data[i].github}
                                height={35}
                                width="35"
                            ></img>
                            <a
                                className="github-resume-link"
                                href={data[i].githubLink}
                                target="_blank"
                            >
                                Git
                            </a>
                        </div>

                        <div className="resume-box">
                            <img
                                className="social-images"
                                src={data[i].resume}
                                height={35}
                                width="35"
                            ></img>
                            <a
                                className="github-resume-link"
                                href="https://github.com/JaviTrek"
                                target="_blank"
                            >
                                Resume
                            </a>
                        </div>
                    </div>

                    <div className="team-description">
                        <h1 className="team-name">{data[i].name}</h1>
                        <p className="team-role"> {data[i].role}</p>
                        <p className="team-bio">{data[i].description}</p>
                    </div>
                </div>
            </div>
        );
        htmlArray.push(memberHTML);
    }

    useEffect(() => {
        setTeamMembers(htmlArray);
    }, []);

    return (
        <React.Fragment>
            <div className="parent-container">
                <div className="main-block-text">
                    <div className="container-content">
                        <h3 className="h3-fire">About</h3>
                        <h1 className="h1-AW">AW-Competitive</h1>

                        <p className="par">
                            A group of 7 young men embark on a project, few have faced before,
                            to recreate the original turn-based strategy video game, Advance
                            Wars.
                        </p>

                        <p className="par2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                        <a
                            className="btn"
                            href="https://github.com/JaviTrek/AW-Competitive"
                            target="_blank"
                        >
                            Github
                        </a>
                    </div>
                </div>
                <img src="../images/about/AW-about.png" className="image1"></img>
            </div>

            <div className="profile-container">
                <h1 className="h1-team">Meet the Team</h1>
                <div className="team-members">{teamMembers}</div>
            </div>

            {/* <div className="team-members">{teamMembers}</div> */}

        </React.Fragment>
    );
};