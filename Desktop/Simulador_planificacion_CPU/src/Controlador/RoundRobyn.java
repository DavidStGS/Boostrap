/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Controlador;

import Modelo.ListaDoble;
import Modelo.Proceso;
import javax.swing.JLabel;

/**
 *
 * @author diego
 */
public class RoundRobyn {
    ListaDoble listaDoble=new ListaDoble();
    public double tiempoespera;
    public double tiemporetorno;
    public double tiemporespuesta;
    public double numeroProcesosEspera;
    public RoundRobyn(ListaDoble listaDoble){
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
            numeroProcesosEspera++;
        }
        numeroProcesosEspera++;
    }
    public void RR(int cuantun) {
       boolean a=true;
       int cpu=0;
       int r=0;
       while(a==true)
            a=false;
        for(int i=0;i<listaDoble.size();i++){
           if(listaDoble.get(i).dato.getRafaga()>cuantun){
               r=listaDoble.get(i).dato.getRafaga()-cuantun;
               listaDoble.insertarFinal(new Proceso(listaDoble.get(i).dato.getNombre(), listaDoble.get(i).dato.getRafaga()-cuantun, listaDoble.get(i).dato.getTiempo(), listaDoble.get(i).dato.getPrioridad(), listaDoble.get(i).dato.getEstado()));
               cpu=listaDoble.get(i).dato.getRafaga()-r;
               listaDoble.get(i).dato.setRafaga(cpu);
               a=true;
           }
       }
    }
    public double tiempo_Espera(){
        double t = 0;
        double r=0;
        String resultado;
        for(int i=0;i<listaDoble.size();i++){
                if(i==0){
                  tiempoespera+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo();
                  r+=t;
                  listaDoble.get(i).dato.setTiempoespera((int) t);
                  System.out.println(listaDoble.get(i).dato+"="+t);
                }else{
                    t=tiempoespera-listaDoble.get(i).dato.getTiempo();
                    r+=t;   
                    System.out.println(listaDoble.get(i).dato+"="+tiempoespera);
                    listaDoble.get(i).dato.setTiempoespera((int) tiempoespera);
                    tiempoespera+=listaDoble.get(i).dato.getRafaga();
                }  
            
        }
        System.out.println("Tiempo Promedio:");
        return r;
    }
     public double tiempoRetorno(){
        double t = 0;
        double r=0;
        for(int i=0;i<listaDoble.size();i++){
                if(i==0){
                  tiemporetorno+=listaDoble.get(i).dato.getRafaga()+listaDoble.get(i).dato.getTiempo();
                  t=listaDoble.get(i).dato.getTiempo()+listaDoble.get(i).dato.getRafaga();
                  t=listaDoble.get(i).dato.getTiempo();
                  r+=t;
                  listaDoble.get(i).dato.setTiemporetorno((int) t);
                  System.out.println(listaDoble.get(i).dato+"="+t);
                }else{
                    t=tiemporetorno+listaDoble.get(i).dato.getRafaga();
                    r+=t;                 
                     listaDoble.get(i).dato.setTiemporetorno((int) tiemporetorno);
                    System.out.println(listaDoble.get(i).dato+"="+t);
                     tiemporetorno+=listaDoble.get(i).dato.getRafaga();
                }  
            
        }
        System.out.println("Tiempo Promedio:");
        return r/listaDoble.size();
    }

     public double TER(int numero){
        int r=0;
        String f;
        int t=0;
        Proceso d;
        int cont=0;
        double respuesta=0;
        for(int i=0;i<listaDoble.size()-1;i++){
            //System.out.println(listaDoble.get(i).dato.getNombre()+"="+listaDoble.get(i).dato.getTiempoespera());
            f=listaDoble.get(i).dato.getNombre();
            d=listaDoble.get(i).dato;
            for(int j=i+1;j<listaDoble.size();j++){
                if(listaDoble.get(i).dato.getNombre()==listaDoble.get(j).dato.getNombre()){
                    f=listaDoble.get(j).dato.getNombre();
                    d=listaDoble.get(j).dato;
                    t+=listaDoble.get(j).dato.getRafaga();
                }
               
            }
            if(listaDoble.get(i).dato.getNombre()==d.getNombre()){
                t=t-d.getRafaga();
                t+=listaDoble.get(i).dato.getRafaga();
            }
            r=d.getTiempoespera()-d.getTiempo()-t;
            respuesta+=r;
            t=0;
            
            if(cont<=numeroProcesosEspera){
                System.out.println(f+"="+r);
                
            }
            cont++;
        }
         System.out.println("Tiempo Promedio Espera es:");
        
         respuesta=respuesta/numero;
        return respuesta;
    }
     public double TRetorno(int numero){
        int r=0;
        String f;
        int t=0;
        Proceso d;
        int cont=0;
        int rafaja=0;
        double respuesta=0;
        for(int i=0;i<listaDoble.size()-1;i++){
            //System.out.println(listaDoble.get(i).dato.getNombre()+"="+listaDoble.get(i).dato.getTiempoespera());
            f=listaDoble.get(i).dato.getNombre();
            d=listaDoble.get(i).dato;
            for(int j=i+1;j<listaDoble.size();j++){
                if(listaDoble.get(i).dato.getNombre()==listaDoble.get(j).dato.getNombre()){
                    f=listaDoble.get(j).dato.getNombre();
                    d=listaDoble.get(j).dato;
                    t+=listaDoble.get(j).dato.getRafaga();
                    rafaja+=d.getRafaga();
                }
               
            }
            if(listaDoble.get(i).dato.getNombre()==d.getNombre()){
                t=t-d.getRafaga();
                t+=listaDoble.get(i).dato.getRafaga();
                rafaja+=listaDoble.get(i).dato.getRafaga();
                d.setRafaga(rafaja);
            }
            r=d.getTiemporetorno()-t+d.getRafaga();
            respuesta+=r;
            t=0;
            rafaja=0;
            if(cont<=numeroProcesosEspera){
                System.out.println(f+"="+r);
                
            }
            cont++;
        }
         System.out.println("Tiempo Premedio Retorno es:");
         respuesta=respuesta/numero;
         return respuesta;
    }
     public double TRespuesta(int numero){
        int r=0;
        String f;
        int t=0;
        Proceso d;
        int cont=0;
        int rafaja=0;
        double respuesta=0;
        for(int i=0;i<listaDoble.size()-1;i++){
            //System.out.println(listaDoble.get(i).dato.getNombre()+"="+listaDoble.get(i).dato.getTiempoespera());
            f=listaDoble.get(i).dato.getNombre();
            d=listaDoble.get(i).dato;
            for(int j=i+1;j<listaDoble.size();j++){
                if(listaDoble.get(i).dato.getNombre()==listaDoble.get(j).dato.getNombre()){
                    f=listaDoble.get(j).dato.getNombre();
                    d=listaDoble.get(j).dato;
                    t+=listaDoble.get(j).dato.getRafaga();

                }
               
            }
            if(listaDoble.get(i).dato.getNombre()==d.getNombre()){
                t=t-d.getRafaga();
                t+=listaDoble.get(i).dato.getRafaga();
                
            }
            r=d.getTiempoespera()-d.getTiempo()-t;
            d.setTiemporespuesta(r);
            r=r+d.getRafaga();
            respuesta+=r;
            t=0;
            rafaja=0;
            if(cont<=numeroProcesosEspera){
                System.out.println(f+"="+r);
                
            }
            cont++;
        }
         System.out.println("Tiempo Premedio Respuesta es:");
        respuesta=respuesta/numero;
        return respuesta;
         
    }
    public String presentar(){
        String respuesta="";
        for(int i=0;i<listaDoble.size();i++){
            respuesta+=String.valueOf(listaDoble.get(i).dato);
        }
        return respuesta;
    }
    public void unionE(JLabel label,int numero){
        tiempo_Espera();
        label.setText(String.valueOf(TER(numero)));
    }
    public void unionRet(JLabel label,int numero){
        tiempoRetorno();
        label.setText(String.valueOf(TRetorno(numero)));
    }
    public void unionResp(JLabel label,int numero){
        label.setText(String.valueOf(TRespuesta(numero)));
    }
    public static void main(String[] args) {
     ListaDoble l=new ListaDoble();
     Proceso p1=new Proceso("p1", 3, 2, 1, null);
     Proceso p2=new Proceso("p2", 1, 4, 1, null);
     Proceso p3=new Proceso("p3", 3, 0, 2, null);
     Proceso p4=new Proceso("p4", 4, 1, 3, null);
     Proceso p5=new Proceso("p5", 2, 3, 4, null);
     l.insertarCabecera(p1);
     l.insertarInicio(p2);
     l.insertarInicio(p3);
     l.insertarInicio(p4);
     l.insertarInicio(p5);
    RoundRobyn r=new RoundRobyn(l);
    r.FCSC();
    r.RR(3);
    System.out.println(r.presentar());
  
    }
}
