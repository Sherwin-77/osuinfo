import Image from "next/image";
import { OsuWebData, type User } from "@/@types/osu";

import "./osuinfo.css"
import { memo, useEffect } from "react";
import { type ChartOptions, Chart as ChartJS, Plugin, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables)

interface Props {
    data?: OsuWebData
}

const chartPlugins: Plugin[] = [{
    id: "tooltipLine",
    afterDraw: (chart: { tooltip?: any; scales?: any; ctx?: any }) => {
        if (chart.tooltip._active && chart.tooltip._active.length) {
            // find coordinates of tooltip
            const activePoint = chart.tooltip._active[0];
            const { ctx } = chart;
            const { x } = activePoint.element;
            const topY = chart.scales.y.top;
            const bottomY = chart.scales.y.bottom;

            // draw vertical line
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x, topY);
            ctx.lineTo(x, bottomY);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#FFF';
            ctx.stroke();
            ctx.restore();
        }
    }
}];

const chartOptions = {
    interaction: {
        intersect: false,
        mode: "index"
    },
    responsive: true,
    borderColor: "#36A2EB",
    maintainAspectRatio: false,
    resizeDelay: 10,
    elements: {
        point: {
            radius: 0
        }
    },
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: "Rank History",
        }
    },
    scales: {
        x: {
            border: {
                color: "gray"
            },
            grid: {
                display: false
            },
            ticks: {
                display: false
            }
        },
        y: {
            border: {
                color: "gray"
            },
            grid: {
                display: false
            },
            ticks: {
                display: false
            }
        },
    }
}
ChartJS.register(chartPlugins)

const OsuInfo = memo(function OsuComponent(props: Props) {
    let endRef: HTMLElement | undefined = undefined
    useEffect(() => {
        endRef?.scrollIntoView({ behavior: "smooth" })
    }, [endRef]);
    const userdata = props.data?.user
    if (!userdata) return
    const reversedRankData = userdata.rank_history ? [...userdata.rank_history.data].reverse() : null
    return (
        <div className="container bg-body-tertiary p-3 m-3">
            <h3>Profile</h3>
            <div className="row">
                <div className="d-flex col mb-3" ref={(el) => el ? endRef = el : ""}>
                    <div className="row" style={{ alignSelf: "flex-end" }}>
                        <div className="col">
                            <Image src={userdata.avatar_url} height={200} width={200} alt="avatar" />
                        </div>
                        <div className="col d-flex flex-column justify-content-end">
                            <h4>{userdata.username}</h4>
                            <div className="d-flex mt-3">
                                <Image alt="country" width={50} height={0} style={{ height: "auto" }} src={`/flags/${userdata.country_code}.svg`}></Image>
                                <span className="ms-2 center" >{userdata.country?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="center" style={{ maxHeight: "200px" }}>
                        {reversedRankData ?
                            <Line
                                options={chartOptions as ChartOptions}
                                data={{
                                    labels: reversedRankData,
                                    datasets: [
                                        { data: reversedRankData },
                                    ]
                                }}
                                plugins={chartPlugins}
                            /> : null}
                    </div>
                    <div className="d-flex">
                        <div className="mb-2 mt-auto me-3 text-end" style={{ width: "100%" }} >
                            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={userdata.statistics.level.progress} aria-valuemin={0} aria-valuemax={100}>
                                <div className="progress-bar" style={{ width: `${userdata.statistics.level.progress}%`, height: "100%" }}></div>
                            </div>
                            <b>{userdata.statistics.level.progress}%</b>
                        </div>
                        <div className="position-relative text-center">
                            <Image src="/levelbadge.png" alt="level" width={77} height={77} ></Image>
                            <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "24px", fontWeight: "bold" }}>{userdata.statistics.level.current}</span>
                        </div>
                    </div>
                </div>
            </div>
            {userdata.badges.map((it) => {
                return <Image key={it.description} src={it.image_url} alt={it.description} width={500} height={80} style={{ width: "auto" }} />
            })}
            <hr />
            <dl className="row mb-3">
                <dt className="col-sm-2">Supporter</dt>
                <dd className="col-sm-10">: {userdata.is_supporter ? "Yes" : "No"} {userdata.has_supported ? "(Has supported)" : "(Never supported)"}</dd>
                <dt className="col-sm-2">Joined since</dt>
                <dd className="col-sm-10">: {new Date(userdata.join_date).toDateString()}</dd>
                <dt className="col-sm-2">Playmode</dt>
                <dd className="col-sm-10">: {userdata.playmode}</dd>
            </dl>
            <div className="row">
                <h3>Statistics</h3>
                <div className="col-md-6 my-3">
                    <div className="row stats">
                        <div className="col">
                            <Image alt='A' src="/A.svg" width={0} height={35} style={{ width: "100%" }} />
                            <span>{userdata.statistics.grade_counts.a}</span>
                        </div>
                        <div className="col">
                            <Image alt='S' src="/S.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{userdata.statistics.grade_counts.s}</span>
                        </div>
                        <div className="col">
                            <Image alt="S Hidden" src="/SH.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{userdata.statistics.grade_counts.sh}</span>
                        </div>
                        <div className="col">
                            <Image alt="S Hidden" src="/SS.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{userdata.statistics.grade_counts.ss}</span>
                        </div>
                        <div className="col">
                            <Image alt="S Hidden" src="/SSH.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{userdata.statistics.grade_counts.ssh}</span>
                        </div>
                    </div>
                </div>
                <h3>Records</h3>
                <div className="col-md-6 my-3">
                    <div className="row stats">
                        <div className="col">
                            <h4><span className="badge bg-primary bg-gradient">300</span></h4>
                            <span>{userdata.statistics.count_300}</span>
                        </div>
                        <div className="col">
                            <h4><span className="badge bg-secondary bg-gradient">100</span></h4>
                            <span>{userdata.statistics.count_100}</span>
                        </div>
                        <div className="col">
                            <h4><span className="badge bg-warning bg-gradient bg-opacity-50">50</span></h4>
                            <span>{userdata.statistics.count_50}</span>
                        </div>
                        <div className="col">
                            <h4><span className="badge bg-danger bg-gradient">Miss</span></h4>
                            <span>{userdata.statistics.count_miss}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 my-3"></div>
                <hr />
                <div className="col-sm-2 mb-3"><b>PP: </b></div>
                <div className="col-sm-2">{userdata.statistics.pp}</div>
                <div className="col-sm-2"><b>Global Rank: </b></div>
                <div className="col-sm-2">{userdata.statistics.global_rank}</div>
                <div className="col-sm-2"><b>Accuracy:</b></div>
                <div className="col-sm-2">{userdata.statistics.hit_accuracy}%</div>
            </div>
        </div>
    )
})

export default OsuInfo;