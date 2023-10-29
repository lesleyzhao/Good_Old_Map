import { FormInputsPopup } from "../form/formInput";
import { FormBtns } from "../form/formBtn";

function PopupContent(props){
    // props: title, inputs(array of input objects), buttons (array of button objects)
    return (
        <>
        {/* TODO: center of the whole screen, z-index largest */}
        <div>
            <div className="w-[60%] py-8 m-auto border">
                <div className="px-8">
                    <h3>{props?.title}</h3>
                    <form>
                        <FormInputsPopup inputs={props?.inputs}/>
                        <div className="flex flex-row gap-2">
                            <FormBtns buttons={props?.buttons}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )

}

export default PopupContent