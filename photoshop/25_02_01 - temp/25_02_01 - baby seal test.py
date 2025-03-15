import matplotlib.pyplot as plt
import numpy as np

def draw_baby_deer():
    fig, ax = plt.subplots()
    ax.set_aspect('equal')
    ax.set_xlim(-2, 2)
    ax.set_ylim(-2, 2)
    ax.axis('off')
    
    # Draw the body (slimmer ellipse) - separated
    body = plt.Circle((-1, -0.2), 0.6, color='saddlebrown', ec='black')
    ax.add_patch(body)
    
    # Draw the head (smaller circle) - separated
    head = plt.Circle((1, 0.7), 0.4, color='saddlebrown', ec='black')
    ax.add_patch(head)
    
    # Draw the eyes - separated
    left_eye = plt.Circle((-1.5, 0.8), 0.06, color='black')
    right_eye = plt.Circle((-1.3, 0.8), 0.06, color='black')
    ax.add_patch(left_eye)
    ax.add_patch(right_eye)
    
    # Draw the nose - separated
    nose = plt.Circle((1.5, 0.65), 0.04, color='black')
    ax.add_patch(nose)
    
    # Draw the mouth - separated
    mouth_x = np.linspace(1.4, 1.6, 100)
    mouth_y = -0.04 * (mouth_x ** 2) + 0.5
    ax.plot(mouth_x, mouth_y, color='black', linewidth=2)
    
    # Draw the ears - separated
    left_ear = plt.Polygon([(-1.8, 0.9), (-1.6, 1.1), (-1.4, 0.9)], color='saddlebrown', ec='black')
    right_ear = plt.Polygon([(1.8, 0.9), (1.6, 1.1), (1.4, 0.9)], color='saddlebrown', ec='black')
    ax.add_patch(left_ear)
    ax.add_patch(right_ear)
    
    # Draw the spots - scattered
    spots = [(0.5, 0.15), (-0.5, 0.15), (1.5, -0.05), (-1.5, -0.05), (0.8, -0.15), (-0.8, -0.15)]
    for spot in spots:
        ax.add_patch(plt.Circle(spot, 0.06, color='white'))
    
    plt.show()

draw_baby_deer()