
package programa;

public class SJFApropiativo {
    ListaDoble listaDoble=new ListaDoble();
    public double tiempoespera;
    public double tiemporetorno;
    public double tiemporespuesta;
    ListaDoble listaauxiliar = new ListaDoble();
    public SJFApropiativo(ListaDoble listaDoble){
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
     public void SJFApropiativo(){
        
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
     Proceso p1=new Proceso("p1", 3, 0, 4, null);
     Proceso p2=new Proceso("p2", 1, 1, 4, null);
     Proceso p3=new Proceso("p3", 2, 4, 4, null);
     Proceso p4=new Proceso("p4", 3, 5, 4, null);
     Proceso p5=new Proceso("p5", 2, 5, 4, null);
     l.insertarCabecera(p1);
     l.insertarInicio(p2);
     l.insertarInicio(p3);
     l.insertarInicio(p4);
     l.insertarInicio(p5);
     SJFApropiativo s=new SJFApropiativo(l);
     s.FCSC();
     System.out.println(s.presentar());
    }
}
