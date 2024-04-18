import { Link } from "@remix-run/react";
import { ShoppingCartIcon } from "../icons/shopping.cart";
import { UsersIcon } from "../icons/user";
import { Badge } from "../ui/badge";

export function Navbar() {
  return (
    <div className="flex-1 overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        <Link
          className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
          to="#"
        >
          <ShoppingCartIcon className="h-4 w-4" />
          Orders
          <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
            6
          </Badge>
        </Link>

        <Link
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
          to="#"
        >
          <UsersIcon className="h-4 w-4" />
          Customers
        </Link>
      </nav>
    </div>
  );
}
