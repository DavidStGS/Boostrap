/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.ListaDoble;
import Modelo.Proceso;
import Controlador.Fifo;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author diego
 */
public class SJFNoApropiativo {
    ListaDoble listaDoble=new ListaDoble();
    public double tiempoespera;
    public double tiemporetorno;
    public double tiemporespuesta;
    
    public SJFNoApropiativo(ListaDoble listaDoble){
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
    public void NoApropiativo(){
        Proceso base;
        int rafaga = listaDoble.get(0).dato.getRafaga() + listaDoble.get(0).dato.getTiempo();
        for (int i = 0; i < listaDoble.size() - 1; i++) {
            base = listaDoble.get(i + 1).dato;
            for (int j = i + 1; j < listaDoble.size() - 1; j++) {

                if (listaDoble.get(j + 1).dato.getRafaga() < base.getRafaga()) {
                    if (listaDoble.get(j + 1).dato.getTiempo() <= rafaga) {
                        base = listaDoble.get(j + 1).dato;
                        listaDoble.modificar(j + 1, listaDoble.get(i + 1).dato);
                        listaDoble.modificar(i + 1, base);
                    }
                } else {
                    if (listaDoble.get(j + 1).dato.getRafaga() == listaDoble.get(j).dato.getRafaga()) {
                        base = listaDoble.get(j).dato;
                        listaDoble.modificar(j + 1, listaDoble.get(j + 1).dato);
                        listaDoble.modificar(j, base);
                    }
                }
            }

            rafaga += listaDoble.get(i + 1).dato.getRafaga();
        }
    }
     public double tiempoEspera(){
        double t = 0;
        double r=0;
        for(int i=0;i<listaDoble.size();i++){
                if(i==0){
                  tiempoespera+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo();
                  r+=t;
                  System.out.println(listaDoble.get(i).dato+"="+t);
                }else{
                    t=tiempoespera-listaDoble.get(i).dato.getTiempo();
                    r+=t;
                    tiempoespera+=listaDoble.get(i).dato.getRafaga();
                    System.out.println(listaDoble.get(i).dato+"="+t);
                }  
            
        }
        System.out.println("Tiempo Promedio:");
        return r/listaDoble.size();
    }
      public double tiempoRetorno(){
        double t = 0;
        double r=0;
        for(int i=0;i<listaDoble.size();i++){
                if(i==0){
                  tiemporetorno+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo()+listaDoble.get(i).dato.getRafaga();
                  r+=t;
                  System.out.println(listaDoble.get(i).dato+"="+t);
                }else{
                    t=tiemporetorno+listaDoble.get(i).dato.getRafaga();
                    r+=t;
                    tiemporetorno+=listaDoble.get(i).dato.getRafaga();
                    System.out.println(listaDoble.get(i).dato+"="+t);
                }  
            
        }
        System.out.println("Tiempo Promedio:");
        return r/listaDoble.size();
    }
      public double tiempoRespuesta(){
        double t = 0;
        double r=0;
        for(int i=0;i<listaDoble.size();i++){
                if(i==0){
                  tiemporespuesta+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo();
                  t=t+listaDoble.get(i).dato.getRafaga();
                  r+=t;
                  System.out.println(listaDoble.get(i).dato+"="+t);
                }else{
                    t=tiemporespuesta-listaDoble.get(i).dato.getTiempo();
                    t=t+listaDoble.get(i).dato.getRafaga();
                    r+=t;
                    tiemporespuesta+=listaDoble.get(i).dato.getRafaga();
                    System.out.println(listaDoble.get(i).dato+"="+t);
                }  
            
        }
        System.out.println("Tiempo Promedio:");
        return r/listaDoble.size();
    }
    public String presentar(){
        String respuesta="";
        for(int i=0;i<listaDoble.size();i++){
            respuesta+=String.valueOf(listaDoble.get(i).dato);
        }
        return respuesta;
    }
    public static void main(String[] args) {
        ListaDoble l=new ListaDoble();
        Proceso p1=new Proceso("p1", 3, 2, 4, null);
        Proceso p2=new Proceso("p2", 1, 4, 4, null);
        Proceso p3=new Proceso("p3", 3, 0, 4, null);
        Proceso p4=new Proceso("p4", 4, 1, 4, null);
        Proceso p5=new Proceso("p5", 2, 3, 4, null);
        l.insertarCabecera(p1);
        l.insertarInicio(p2);
        l.insertarInicio(p3);
        l.insertarInicio(p4);
        l.insertarInicio(p5);
        SJFNoApropiativo s=new SJFNoApropiativo(l);
        s.FCSC();
        s.NoApropiativo();
        System.out.println(s.presentar());
        System.out.println("----");
        System.out.println(s.tiempoEspera());
         System.out.println("----");
        System.out.println(s.tiempoRespuesta());
         System.out.println("----");
        System.out.println(s.tiempoRetorno());
    }
}
