/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.ListaDoble;
import Modelo.Nodo;
import Modelo.Proceso;

/**
 *
 * @author diego
 */
public class Prioridad {
     
    ListaDoble listaDoble=new ListaDoble();
    public double tiempoespera;
    public double tiemporetorno;
    public double tiemporespuesta;
    public Prioridad(ListaDoble listaDoble){
        this.listaDoble=listaDoble;
    }
    public void FCSC(){
        for(int i=1;i<listaDoble.size();i++){
            for(int j=0;j<listaDoble.size()-1;j++){
                if(listaDoble.get(i).dato.getTiempo()<listaDoble.get(j).dato.getTiempo()){
                   Proceso aux=listaDoble.get(j).getDato();
                   listaDoble.modificar(j, listaDoble.get(i).dato);
                   listaDoble.modificar(i, aux);
                }
            }
        }
    }
    public void ordena(){
        listaDoble.Prioridad();
    }
    public void algoritmoPrioridad(){
        Proceso base;
        int rafaga = listaDoble.get(0).dato.getRafaga() + listaDoble.get(0).dato.getTiempo();
        for (int i = 0; i < listaDoble.size()-1; i++) {
            base = listaDoble.get(i + 1).dato;
            for (int j = i + 1; j < listaDoble.size()-1; j++) {

                if (listaDoble.get(j + 1).dato.getPrioridad() < base.getPrioridad()) {
                    if (listaDoble.get(j + 1).dato.getTiempo() <= rafaga) {
                        base = listaDoble.get(j + 1).dato;
                        listaDoble.modificar(j + 1, listaDoble.get(i + 1).dato);
                        listaDoble.modificar(i + 1, base);
                    }
                } 
                
            }

            rafaga += listaDoble.get(i + 1).dato.getRafaga();
        }
    }
      public String presentar(){
        String respuesta="";
        for(int i=0;i<listaDoble.size();i++){
            respuesta+=String.valueOf(listaDoble.get(i).dato);
        }
        return respuesta;
    }
      public void presentar2(){
          for(int i=0;i<listaDoble.size();i++){
              System.out.println(listaDoble.get(i).dato.getNombre()+"="+listaDoble.get(i).dato.getRafaga());
          }
      }
    public static void main(String[] args) {
     ListaDoble l=new ListaDoble();
     Proceso p1=new Proceso("p1", 3, 2, 2, null);
     Proceso p2=new Proceso("p2", 1, 4, 3, null);
     Proceso p3=new Proceso("p3", 3, 0, 1, null);
     Proceso p4=new Proceso("p4", 4, 1, 3, null);
     Proceso p5=new Proceso("p5", 2, 3, 4, null);
     l.insertarCabecera(p1);
     l.insertarInicio(p2);
     l.insertarInicio(p3);
     l.insertarInicio(p4);
     l.insertarInicio(p5);
     Prioridad p=new Prioridad(l);  
     p.FCSC();
     p.algoritmoPrioridad();
     System.out.println(p.presentar());
     p.presentar2();
    }
}
