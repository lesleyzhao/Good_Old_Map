import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const FeatureSchema = new Schema({
  type: { type: String, required: true },
  properties: {
    NAME: String,
    ABBREVN: String,
    INFO_UR: String, 
    SUBJECTO: String,
    BORDERPRECISION: Number,
    PARTOF: String,
  },
  geometry: {
    type: { type: String, required: true },
    coordinates: [[[Number]]] 
  }
});

const BorderSchema = new Schema({
  _id: Schema.Types.ObjectId,
  type: { type: String, required: true },
  name: { type: String, required: true },
  crs: {
    type: { type: String, required: true },
    properties: {
      name: { type: String, required: true }
    }
  },
  features: [FeatureSchema]
});

const Border = model('Border', BorderSchema, 'borders');

export default Border;
