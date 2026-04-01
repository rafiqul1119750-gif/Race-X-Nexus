import { ShoppingCart, Gem, Tag } from "lucide-react";
import { useGetShopItems, useAddToCart, useGetUserProfile } from "@workspace/api-client-react";
import { useAppContext } from "@/context/AppContext";
import { useToast } from "@/hooks/use-toast";

export default function Shop() {
  const { data, isLoading } = useGetShopItems();
  const { data: profile } = useGetUserProfile();
  const { setCartCount } = useAppContext();
  const { toast } = useToast();
  
  const { mutate: addToCart, isPending } = useAddToCart({
    mutation: {
      onSuccess: (res) => {
        setCartCount(res.cartCount);
        toast({
          title: "Added to Cart",
          description: "Item successfully added to your inventory.",
          variant: "default",
          className: "bg-black border-primary text-white"
        });
      }
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const items = data?.items || [];

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-black text-glow">RX Shop</h1>
          <p className="text-muted-foreground">Exchange Diamonds & Gems for exclusive digital assets.</p>
        </div>
        <div className="flex gap-4 glass-panel px-6 py-3 rounded-2xl border-primary/30">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Diamonds</span>
            <span className="font-display font-bold text-lg text-glow">{profile?.diamonds || 0} 💎</span>
          </div>
          <div className="w-px bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Gems</span>
            <span className="font-display font-bold text-lg text-secondary">{profile?.gems || 0} 💠</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(item => (
          <div key={item.id} className="glass-panel rounded-3xl overflow-hidden flex flex-col group hover:border-primary/50 transition-colors">
            <div className="relative aspect-square bg-black p-4 flex items-center justify-center">
              {item.discount && (
                <div className="absolute top-3 right-3 bg-destructive text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 z-10 shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                  <Tag className="w-3 h-3" /> {item.discount}% OFF
                </div>
              )}
              {/* placeholder rendering for item image */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-card/90 z-0" />
              <img 
                src={item.imageUrl || "https://images.unsplash.com/photo-1618367588411-d9a90fefa881?w=300&fit=crop"} 
                alt={item.name} 
                className="w-full h-full object-cover mix-blend-screen opacity-50 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500 z-0"
              />
              {/* Floating element representation */}
              <div className="w-24 h-24 bg-primary/20 backdrop-blur border border-primary/50 rounded-xl rotate-12 group-hover:rotate-0 transition-transform duration-500 z-10 shadow-[0_0_20px_rgba(0,212,255,0.3)] flex items-center justify-center">
                <Gem className="w-10 h-10 text-primary" />
              </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between relative z-20 bg-card/50">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{item.category}</span>
                <h3 className="text-lg font-bold text-white mt-1 leading-tight">{item.name}</h3>
                <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
              </div>
              
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-1 font-display font-bold text-lg">
                  {item.price} {item.currency === 'diamonds' ? '💎' : item.currency === 'gems' ? '💠' : '$'}
                </div>
                <button 
                  onClick={() => addToCart({ data: { itemId: item.id, quantity: 1 } })}
                  disabled={isPending}
                  className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/50 flex items-center justify-center hover:bg-primary hover:text-black transition-colors btn-ripple disabled:opacity-50"
                >
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
