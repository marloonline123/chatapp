import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playMessageSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const stored = localStorage.getItem("soundEnabled");
    return stored !== "false";
  });

  const toggleSound = () => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem("soundEnabled", String(newValue));
      return newValue;
    });
  };

  const playMessageSound = useCallback(() => {
    if (soundEnabled) {
      const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2telezhPlNTelW9JVZy+yq5xU1NuqNXxoWw8UpmtsNWzYBILPYmxys2ILgA1cqnE06RbGBthkLzRtHxHNVeTz+iXWhQ4d6rO06RlKylPirTfwYRQOmuiyezYlVMhRnSjzNylXykiY4mx1r6EVU5umMHq0YlEJVN5rMXUqV8oJmWIsNbEmFcqXIKvz9Clbj04XXKXucyzaDIqYoSrytOhczc3Wo6wz86UXDYtdZiywtaiZT5MWIixxc2bXzcteZuzvNWqaj5HXIavw8+gajg0dJOqvtGqYz4xdJquvdWiXTUsdJSrvNGraDk2dpKqvNagZz01cJOtv9OhaT8rcZS0v9GlaD4wc5KuvtWiazkxdJKtvNOjZz0wcZStv9WjaD00bpKvu9OhZTsxbpOvvtSiaT81aJCxv9SgaT4zaZK0wNGiYDotcZSvvdWkaz80Z5C0wNGhZD4zY4+0wNOjaT41Yo+1wdOgZTsxY5C0v9SjajwzYo+0wNOiazsxY5O0v9SiaDwxYI+zvtSkaz0wXo+0wNSjaTwvY5G1wdOgZDo2apC0v9ShZj0zYI+0wNShZD01YJK1wdOiZjwzX4+0wNShZD01X5G0wNSiZjwyX5C0wNOhZDwyX5C0wNSiZjwxXpC0wNShZDwyXpC0wNShZDwyXpC0wNShZDwyXpC0wNShZDwxXpC0wNShZTwxXpC0wNShZDwxXpC0wNShZDwxXpC0wNShZDwxXpC0wNShZDwxXpC0wNShZDwxXpC0wNShZDwxXpC0wNShZDwxXpC0wNShZDwxXpC0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNShZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDwxXo+0wNOhZDw=");
      audio.volume = 0.3;
      audio.play().catch(() => {});
    }
  }, [soundEnabled]);

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playMessageSound }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}
