import styles from "../styles/InicioInfo.module.css";
import { Link } from "react-router-dom";

 type elementos = {
    opcao: string,
    caminho: string,
}

const InicioInfo = ({opcao, caminho}: elementos) => {
    return(
        <div className={styles.container}>
            <div className={styles.informacoes}>
                <h1>
                    Algo aqui
                </h1>
                <p>
                    ?????????????????????????????
                </p>
            </div>
            <div className={styles.botoes}>
                <div className={styles.entrar}>
                    <Link to="/entrar" >
                        Entrar
                    </Link>
                </div>
                <div>
                    <Link to={`${caminho}`}>
                        {opcao}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default InicioInfo;