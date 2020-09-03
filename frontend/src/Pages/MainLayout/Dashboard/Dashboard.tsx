import * as React from 'react';
import Widget from '../Widget';


const widgets = [
    {
        label: "USERS",
        value: "588",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="stroke-current text-grey-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        className: "flex-row justify-content-between"
    },
    {
        label: "SESSIONS",
        value: "435",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="stroke-current text-grey-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
        className: "flex-row justify-content-between"
    },
    {
        label: "BOUNCE RATE",
        value: "40.5%",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="stroke-current text-grey-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>,
        className: "flex-row justify-content-between"
    },
    {
        label: "SESSION DURATION",
        value: "1m 24s",
        icon: <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="stroke-current text-grey-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
        className: "flex-row justify-content-between"
    },
    {
        label: "something else",
        value: "some value",
        className: "flex-row justify-content-between"
    },
]

const Dashboard: React.FC = () => {
    return (
        <div className="dashboard d-flex flex-row flex-wrap justify-content-start">
            {widgets.map( (item, index) => {
                return <Widget key={index} {...item}/>
            })}
            <Widget>
                
            </Widget>
        </div>
        
    )
}
export default Dashboard