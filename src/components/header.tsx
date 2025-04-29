import  { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useLocation } from "wouter";
import { Else, If, Then } from "react-if";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { shortenAddress } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useAccount, useChains, useConnect, useDisconnect, useSwitchChain, useWalletClient } from "wagmi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

export default function Header() {
  const account = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

  const [isOpen, setIsOpen] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const onClose = () => setIsOpen(false);
  const { data: wallet } = useWalletClient();
  const {} = useChains();

  // Track URL changes and close the sheet on navigation
  const [location] = useLocation();
  useEffect(() => {
    setIsSheetOpen(false);
  }, [location]);

  return (
    <div className="py-4 px-6 w-full flex justify-between items-center">
      <Dialog open={isOpen} defaultOpen={false} modal={isOpen}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Select Either of the Two Chains</DialogTitle>
          <div className="flex flex-col space-y-2">
            {chains.map((chain) => (
              <Button
                key={chain.id}
                onClick={async () => {
                  if (wallet) {
                    await wallet.switchChain({ id: chain.id });
                    onClose();
                  }
                }}
              >
                {chain.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Link href="/">
        <Avatar className="h-16 w-16">
          <AvatarImage src="/logo.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
      <div className="flex justify-between text-xl font-semibold space-x-8 items-center hidden md:block">
        {/* <Link href="/explore/137" className="border-b-2 p-2 hover:border-orange-500 hover:text-orange-500">
          Explore Polygon
        </Link>
        <Link href="/explore/1116" className="border-b-2 p-2 hover:border-orange-500 hover:text-orange-500">
          Explore Core
        </Link> */}
        <Link href="/explore" className="border-b-2 p-2 hover:border-orange-500 hover:text-orange-500">
          Explore Memes on Unichain !
        </Link>
      </div>
      <div className="hidden md:block">
        <If condition={account.address}>
          <Then>
            <Popover>
              <PopoverTrigger>
                <Badge>{shortenAddress(account?.address ?? '')}</Badge>
              </PopoverTrigger>
              <PopoverContent className="w-full">
                <div className="flex flex-col space-y-2">
                  {chains.map((chain) => (
                    <Button key={chain.id} onClick={async () => switchChain({ chainId: chain.id })}>
                      {chain.name}
                    </Button>
                  ))}
                  <Button onClick={() => disconnect()}>Disconnect</Button>
                </div>
              </PopoverContent>
            </Popover>
          </Then>
          <Else>
            <Dialog>
              <DialogTrigger className="px-4 py-2 rounded-full text-center bg-white dark:bg-white text-black font-semibold">
                Connect Wallet
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center">Select Wallet</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  <div className="flex flex-col items-center my-4">
                    {connectors.map((connector) => (
                      <Button
                        key={connector.uid}
                        onClick={() => connect({ connector })}
                        className="my-2"
                      >
                        {connector.name}
                      </Button>
                    ))}
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </Else>
        </If>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Menu className="md:hidden h-6 w-6" />
        </SheetTrigger>
        <SheetContent className="flex flex-col space-y-8">
          {/* <Link href="/explore/137" className="border-b-2 p-2 hover:border-orange-500 hover:text-orange-500">
            Explore Polygon
          </Link>
          <Link href="/explore/1116" className="border-b-2 p-2 hover:border-orange-500 hover:text-orange-500">
            Explore Core
          </Link> */}
           <Link href="/explore/1301" className="border-b-2 p-2 hover:border-orange-500 hover:text-orange-500">
          Explore Memes on Unichain !
        </Link>
          <If condition={account.address}>
            <Then>
              <Popover>
                <PopoverTrigger>
                  <Badge>{shortenAddress(account?.address ?? '')}</Badge>
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <div className="flex flex-col space-y-2">
                    {chains.map((chain) => (
                      <Button key={chain.id} onClick={async () => switchChain({ chainId: chain.id })}>
                        {chain.name}
                      </Button>
                    ))}
                    <Button onClick={() => disconnect()}>Disconnect</Button>
                  </div>
                </PopoverContent>
              </Popover>
            </Then>
            <Else>
              <Dialog>
                <DialogTrigger className="px-4 py-2 rounded-full text-center bg-white dark:bg-white text-black font-semibold">
                  Connect Wallet
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="text-center">Select Wallet</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    <div className="flex flex-col items-center my-4">
                      {connectors.map((connector) => (
                        <Button
                          key={connector.uid}
                          onClick={() => connect({ connector })}
                          className="my-2"
                        >
                          {connector.name}
                        </Button>
                      ))}
                    </div>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            </Else>
          </If>
        </SheetContent>
      </Sheet>
    </div>
  );
}
