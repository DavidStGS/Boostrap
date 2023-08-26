/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package programa;



import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import javax.swing.Icon;
import javax.swing.ImageIcon;

/**
 *
 * @author diego
 */
public class Dibujos extends javax.swing.JPanel {
    String nombre;
    int cont=0;
    ListaDoble listaDoble=new ListaDoble();
  
    public Dibujos(int cont,ListaDoble listaDoble) {
        initComponents();
        this.setOpaque(true);
        this.setSize(new Dimension(3000,20));
        this.setBackground(Color.black);
        this.cont=cont;
        this.listaDoble=listaDoble;
        
    }
     public void paint(Graphics g){
    super.paint(g);
        g.setColor(Color.gray);
        
        int disNodo = 50,aumentoNodo = 120;
        
        int disNombre = 77,aumentoNombre=120;
        
        for (int i = 0; i < cont; i++) {

            //g.drawImage(img.getImage(), disNodo, 35, 170, 50, this);
            g.setColor(Color.gray);
            g.fillRect(disNodo, 35, 100, 50);
            disNodo += aumentoNodo;
            
            this.setSize(disNodo+200, 21);
                                    
            g.setColor(Color.black);
            g.drawString(listaDoble.get(i).dato.getNombre(), disNombre, 60);
            
            this.repaint();

            
            disNombre += aumentoNombre;
            
        }

    }

    /**
     * This method is called from within the constructor to initialize the form.
     * WARNING: Do NOT modify this code. The content of this method is always
     * regenerated by the Form Editor.
     */
    @SuppressWarnings("unchecked")
    // <editor-fold defaultstate="collapsed" desc="Generated Code">//GEN-BEGIN:initComponents
    private void initComponents() {

        javax.swing.GroupLayout layout = new javax.swing.GroupLayout(this);
        this.setLayout(layout);
        layout.setHorizontalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 400, Short.MAX_VALUE)
        );
        layout.setVerticalGroup(
            layout.createParallelGroup(javax.swing.GroupLayout.Alignment.LEADING)
            .addGap(0, 300, Short.MAX_VALUE)
        );
    }// </editor-fold>//GEN-END:initComponents
    // Variables declaration - do not modify//GEN-BEGIN:variables
    // End of variables declaration//GEN-END:variables
}
