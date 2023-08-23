import Image from "next/image";
import { type User } from "@/@types/osu";

import "./osuinfo.css"
import { memo, useEffect } from "react";

interface Props {
    data?: User
}

const OsuInfo = memo(function OsuComponent(props: Props) {
    const data = props.data
    if(!data) return
    let endRef: HTMLElement | undefined = undefined
    useEffect(() => {
        endRef?.scrollIntoView({ behavior: "smooth" })
    }, endRef);
    return (
        <div className="container bg-body-tertiary p-3 m-3">
            <h3>Profile</h3>
            <div className="d-flex mb-3" ref={(el) => el ? endRef = el : ""}>
                <Image src={data.avatar_url} height={200} width={200} alt="avatar" className="img-thumbnail" />
                <div style={{ alignSelf: "flex-end", padding: "12px" }}>
                    <h4>{data.username}</h4>
                    <div className="d-flex mt-3">
                        <Image alt="country" width={50} height={0} style={{ height: "auto" }} src={`/flags/${data.country_code}.svg`}></Image>
                        <span className="ms-2 center" >{data.country?.name}</span>
                    </div>
                </div>
                <div className="align-self-end ms-auto me-3 d-flex w-50">
                    <div className="mb-2 mt-auto me-3 text-end" style={{ width: "100%" }} >
                        <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow={data.statistics.level.progress} aria-valuemin={0} aria-valuemax={100}>
                            <div className="progress-bar" style={{ width: `${data.statistics.level.progress}%`, height: "100%" }}></div>
                        </div>
                        <b>{data.statistics.level.progress}%</b>
                    </div>
                    <div className="position-relative text-center">
                        <Image src="/levelbadge.png" alt="level" width={77} height={77} ></Image>
                        <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "24px", fontWeight: "bold" }}>{data.statistics.level.current}</span>
                    </div>
                </div>
            </div>
            {data.badges.map((it) => {
                return <Image key={it.description} src={it.image_url} alt={it.description} width={500} height={80} style={{width: "auto"}} />
            })}
            <hr />
            <dl className="row mb-3">
                <dt className="col-sm-2">Supporter</dt>
                <dd className="col-sm-10">: {data.is_supporter ? "Yes" : "No"} {data.has_supported ? "(Has supported)" : "(Never supported)"}</dd>
                <dt className="col-sm-2">Joined since</dt>
                <dd className="col-sm-10">: {new Date(data.join_date).toDateString()}</dd>
                <dt className="col-sm-2">Playmode</dt>
                <dd className="col-sm-10">: {data.playmode}</dd>
            </dl>
            <div className="row">
                <h3>Statistics</h3>
                <div className="col-md-6 my-3">
                    <div className="row stats">
                        <div className="col">
                            <Image alt='A' src="/A.svg" width={0} height={35} style={{ width: "100%" }} />
                            <span>{data.statistics.grade_counts.a}</span>
                        </div>
                        <div className="col">
                            <Image alt='S' src="/S.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{data.statistics.grade_counts.s}</span>
                        </div>
                        <div className="col">
                            <Image alt="S Hidden" src="/SH.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{data.statistics.grade_counts.sh}</span>
                        </div>
                        <div className="col">
                            <Image alt="S Hidden" src="/SS.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{data.statistics.grade_counts.ss}</span>
                        </div>
                        <div className="col">
                            <Image alt="S Hidden" src="/SSH.svg" width={0} height={35} style={{ width: '100%' }} />
                            <span>{data.statistics.grade_counts.ssh}</span>
                        </div>
                    </div>
                </div>
                <h3>Records</h3>
                <div className="col-md-4 my-3">
                    <div className="row stats">
                        <div className="col">
                            <h4><span className="badge bg-primary bg-gradient">300</span></h4>
                            <span>{data.statistics.count_300}</span>
                        </div>
                        <div className="col">
                            <h4><span className="badge bg-secondary bg-gradient">100</span></h4>
                            <span>{data.statistics.count_100}</span>
                        </div>
                        <div className="col">
                            <h4><span className="badge bg-warning bg-gradient bg-opacity-50">50</span></h4>
                            <span>{data.statistics.count_50}</span>
                        </div>
                        <div className="col">
                            <h4><span className="badge bg-danger bg-gradient">Miss</span></h4>
                            <span>{data.statistics.count_miss}</span>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 my-3"></div>
                <hr />
                <div className="col-sm-2 mb-3"><b>PP: </b></div>
                <div className="col-sm-2">{data.statistics.pp}</div>
                <div className="col-sm-2"><b>Global Rank: </b></div>
                <div className="col-sm-2">{data.statistics.global_rank}</div>
                <div className="col-sm-2"><b>Accuracy:</b></div>
                <div className="col-sm-2">{data.statistics.hit_accuracy}%</div>
            </div>
        </div>
    )
})

export default OsuInfo;