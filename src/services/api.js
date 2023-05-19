import axios from 'axios';
import { api } from './services';

export default class Api{
     static async findHighestConsuming(){
          try{
               const res = await axios.get(
                    `${api}api/application/findHighestConsuming`,
                    {
                         headers: {
                              "Access-Control-Allow-Origin": "*",
                              'Content-Security-Policy': ['default-src \'none\'', 'connect-src \'self\'']
                         }
                    }
               )
               return res
          } catch(err){
               return err
          }
     }

     
     static async getDownloadSum(){
          try{
               const res = await axios.get(
                    `${api}api/application/getDownloadSum`,
                    {
                         headers: {
                              "Access-Control-Allow-Origin": "*",
                              'Content-Security-Policy': ['default-src \'none\'', 'connect-src \'self\'']
                         }
                    }
               )
               return res
          } catch(err){
               return err
          }
     }
}
