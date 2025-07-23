import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateownerMutation } from "@/app/service/owner";

export function OwnerStaffPOST({
  isPosting,
  name,
  email,
  password,
  phone,
  setName,
  setEmail,
  setPassword,
  setPhone,
  handleSubmit,
  setIsAddHostelOpen,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
      <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Owner</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="owner-name">Name</Label>
                          <Input
                            id="owner-name"
                            placeholder="Enter admin name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>

                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4 text-muted-foreground cursor-pointer" />
                              ) : (
                                <Eye className="h-4 w-4 text-muted-foreground cursor-pointer" />
                              )}
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            placeholder="+91 0000000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                          />
                        </div>
                        {/* <div className="space-y-2">
                            <Label htmlFor="street">Street</Label>
                            <Input
                              id="street"
                              placeholder="Enter street"
                              value={location.street}
                              onChange={(e) =>
                                setLocation({
                                  ...location,
                                  street: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="place">Place</Label>
                            <Input
                              id="place"
                              placeholder="Enter place"
                              value={location.place}
                              onChange={(e) =>
                                setLocation({
                                  ...location,
                                  place: e.target.value,
                                })
                              }
                            />
                          </div> */}
                        {/* <div className="space-y-2">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input
                              id="pincode"
                              placeholder="Enter pincode"
                              value={location.pincode}
                              onChange={(e) =>
                                setLocation({
                                  ...location,
                                  pincode: e.target.value,
                                })
                              }
                            />
                          </div> */}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddHostelOpen(false)}
                        className={"cursor-pointer"}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-rose-600 hover:bg-rose-700 cursor-pointer"
                        onClick={handleSubmit}
                      >
                        {isPosting ? "Creating..." : "Create"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
  );
}



export function StaffPUT({ staff, onClose, onUpdated }) {
  const [name, setName] = useState(staff.name || "");
  const [email, setEmail] = useState(staff.email || "");
  const [phone, setPhone] = useState(staff.phone || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [updateowner, { isLoading }] =  useUpdateownerMutation();

  const handleUpdate = async () => {
  try {
    const updateData = {
      id: staff?._id,
       updateowner: {
        name,
        email,
        phone,
        ...(password && { password }),
      },
    };

    const { status } = await updateowner(updateData).unwrap();

    if (status === 200) {
      onClose();
      onUpdated();
    }
  } catch (err) {
    console.error("Failed to update staff:", err);
  }
};


  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Edit Staff</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password (optional)</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          className="bg-rose-600 hover:bg-rose-700"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
