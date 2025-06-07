export default function Button(props) {
    const { 
        children,
        classname,
        onClick = () => {},
        type = "button"} = props
        
    return (
        <div>
            <button  
            className={`${classname} text-white font-bold py-2 px-3 rounded-md w-full`}
            type={type}
            onClick={onClick}
        >
                {children}
            </button>
        </div>
    )
}