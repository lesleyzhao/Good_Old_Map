import { FormInputsPopup } from "../form/formInput";
import { FormBtns } from "../form/formBtn";

function PopupContent(props){
    // props: title, input(array of input objects), buttons (array of button objects)
    return (
        <>
            <h2>{props?.title}</h2>
            <form>
                <FormInputsPopup fields={props?.input}/>
                <FormBtns buttons={props?.buttons}/>
            </form>
        </>
    )

}

export default PopupContent