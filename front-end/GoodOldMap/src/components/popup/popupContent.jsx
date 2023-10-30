import { FormInputsPopup } from "../form/formInput";
import { FormBtns } from "../form/formBtn";

function PopupContent(props){
  // props: title(str), inputs(array of object), buttons:(array of object)
  return (
    // dark background
    <div 
      className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex items-center justify-center" 
      onClick={() => {props.handleClick()}}>   
      {/* white popup container: */}
      <div className="bg-white rounded-lg shadow-xl w-[80%]">
        <div className="p-8">
          {/* content area */}
          <h3 className="text-lg font-bold mb-4 text-center">{props?.title}</h3>
          <form className="space-y-4">
            <FormInputsPopup inputs={props?.inputs}/>
            <div className="flex flex-row gap-2 justify-end"> {/* Adjust button positioning as needed */}
              <FormBtns buttons={props?.buttons}/>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}


export default PopupContent