import { IosPickerItem } from './PickerItem'

const EmblaCarousel = (props) => {
  const { loop } = props

  return (
    <div className="embla">
      <IosPickerItem
        slideCount={1920}
        perspective="left"
        loop={loop}
        label="year"
      />
      <IosPickerItem
        slideCount={12}
        perspective="right"
        loop={loop}
        label="Month"
      />
    </div>
  )
}

export default EmblaCarousel
