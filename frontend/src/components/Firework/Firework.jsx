import style from './Firework.module.css';

function Firework()  {
    return (
        <div className={style.body}>
            <div className={style.firework}></div>
            <div className={style.firework}></div>
            <div className={style.firework}></div>
        </div>
        );
}

export default Firework;