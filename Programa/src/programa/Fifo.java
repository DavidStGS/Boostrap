
package programa;

public class Fifo {
    
    ListaDoble listaDoble=new ListaDoble();
    public double tiempoespera;
    public double tiemporetorno;
    public double tiemporespuesta;
    public Fifo(ListaDoble listaDoble){
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
     l.insertarPrincipio(p1);
     l.insertarPrincipio(p2);
     l.insertarPrincipio(p3);
     l.insertarPrincipio(p4);
     l.insertarPrincipio(p5);
     Fifo f=new Fifo(l);
     System.out.println(f.presentar());
     f.FCSC();
     System.out.println(f.presentar());
        System.out.println("---");
     System.out.println(f.tiempoEspera());
     System.out.println("---");
        System.out.println(f.tiempoRetorno());
     System.out.println("---");
        System.out.println(f.tiempoRespuesta());
    }
}
