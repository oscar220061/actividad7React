import { useState, useEffect, useCallback } from "react";
import "../estilos/formulario.css";

const Formulario = () => {
    const [terminos, setTerminos] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [sexo, setSexo] = useState(null);
    const [errores, setErrores] = useState({ nombre: "", apellido: "", email: "", terminos: "" });
    const [formValido, setFormValido] = useState(false);
    
    const [terminosOk, setTerminosOk] = useState(false);
    const [nombreOk, setNombreOk] = useState(false);
    const [apellidoOk, setApellidoOk] = useState(false);
    const [emailOk, setEmailOk] = useState(false);

   
    const [caracteresRestantes, setCaracteresRestantes] = useState(500);
    const [mensaje, setMensaje] = useState("")
    const handleMensaje = (e) =>{
        const nuevoMensaje = e.target.value;
        setMensaje(nuevoMensaje);
            const caracteresUsados = nuevoMensaje.length;
            const restantes = 500 - caracteresUsados;
            setCaracteresRestantes(restantes);
        if (caracteresUsados >= 500) {
                const nuevaCadena = nuevoMensaje.slice(0, 499);
                setMensaje(nuevaCadena);
            }
        };


  const validarFormulario = useCallback(() => { 
    let errores = {};
    let formValido = false;
   
    // Validación del nombre
    if (nombre.length <=10  && nombre.length > 0) {
      setNombreOk(true)
      
    }else{
      setNombreOk(false)
        errores.nombre = "El nombre no puede superar los 10 carácteres ni estar vacío";
    }
    // Validación del apelidos
    if (apellido.length <=20  && apellido.length > 0) {
      setApellidoOk(true)
      
    }else{
      setApellidoOk(false)
        errores.apellido = "El apellido no puede superar los 20 carácteres ni estarvacío";
    }

    // Validación del email
    if (email.includes("@") && email.length > 0 && email.length <= 20) {
      setEmailOk(true)
      
    }else{
      setEmailOk(false)
        errores.email = "El email no puede superar los 20 carácteres, ni estar vacío. Ademas debe contener el carácter @";
    }
    //Validacion de los terminos
    if(terminos === true){
        setTerminosOk(true)
       
    }else{
      setTerminosOk(false)
      errores.terminos = "Debe aceptar los términos y condiciones de uso.";
      
    }
    if(nombreOk && apellidoOk && emailOk && terminosOk){
        formValido = true;
        setFormValido(formValido);
    }else{
      formValido = false;
      setFormValido(formValido);
    }
    
    setErrores(errores);
    
  },[nombre, apellido, email, terminos, nombreOk, apellidoOk, emailOk, terminosOk])
  

  function handleSubmit(e){
    e.preventDefault();
    if(formValido){
      //mandar datos

      setNombreOk(false)
      setApellidoOk(false)
      setEmailOk(false)
      setTerminosOk(false)
      setApellido("")
      setNombre("")
      setEmail("")
      setMensaje("")
      setCaracteresRestantes(500)
      setFormValido(false)
      setTerminos(false)
      return alert('Datos enviados correctamente');
    }
    
  };

  
  useEffect(() => {
    validarFormulario()
  }, [validarFormulario]);

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div>
      <h3>Rellene el formulario</h3>
        <p>Nombre: <input type="text" onChange={(e) => setNombre(e.target.value)}  value = {nombre}/></p>
        <p className="texto-rojo">{errores.nombre}</p>
        <p>Apellidos: <input type="text" onChange={(e) => setApellido(e.target.value)}  value = {apellido}/></p>
        <p className="texto-rojo">{errores.apellido}</p>
        <p>Email: <input type="text" onChange={(e) => setEmail(e.target.value)}  value = {email}/></p>
        <p className="texto-rojo">{errores.email}</p>
        <p>Sexo: <select value={sexo || ""} onChange={(e) => setSexo(e.target.value)}>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>                            
        </select></p>

        <p>Mensaje: <textarea value={mensaje} onChange={handleMensaje} /></p>
        <p>Te quedan {caracteresRestantes} carácteres</p>           
            <p><input type="checkbox" value={terminos} onChange={() => setTerminos(!terminos)} checked={terminos}/> Aceptar teminos y condiciones de uso</p>
            <p className="texto-rojo">{errores.terminos}</p>
            
      </div>

      <button className={formValido ? "boton-verde" : "boton-rojo"}type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;