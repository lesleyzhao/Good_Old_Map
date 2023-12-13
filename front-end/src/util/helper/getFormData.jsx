/* Read form data from "formRef" and return json
   Throw object {requestMessage: "..."} on unfilled input
*/
const getFormData = (formRef) => {
  const requestData = {}
  const formData = new FormData(formRef.current)
  
  formData.forEach((val, key) => {
    requestData[key] = val
    // throw failure on empty input slots
    if (!val) throw {requestMessage:"Please fill in all input slots"}
  })
  return requestData
}

export default getFormData