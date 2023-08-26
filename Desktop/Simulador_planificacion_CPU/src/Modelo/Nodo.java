/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package Modelo;

/**
 *
 * @author diego
 */
public class Nodo {
    public Proceso dato; 
    public Nodo siguiente;
    public Nodo anterior;
    public Nodo(Proceso dato) {
        this.dato = dato;
        this.siguiente=null;
        this.anterior=null;
    } 

    public Proceso getDato() {
        return dato;
    }

    public void setDato(Proceso dato) {
        this.dato = dato;
    }
    
    public Nodo getAnterior() {
        return anterior;
    }

    public void setAnterior(Nodo anterior) {
        this.anterior = anterior;
    }

    
}
